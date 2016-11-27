/**
 * Created by wannes on 2/21/15.
 */
define(['app'], function (app) {
    app.controller('AccountDetails',
        ['$scope', '$routeParams', '$http', '$location', 'User', 'Transaction', 'Account', 'AccountBalance',
            'BillingScheme', 'BillingSchemeInstance',
            function (
                $scope,
                $routeParams,
                $http,
                $location,
                User,
                Transaction,
                Account,
                AccountBalance,
                BillingScheme,
                BillingSchemeInstance
            ) {
                $scope.id = $routeParams.id;
                $scope.balanceStyle = 'balance-zero';
                $scope.reassign = {active: false, target: ''};

                Account.get({id: $scope.id}, function (account) {
                    "use strict";
                    $scope.account = account;
                    User.get({id: account.owner}, function(a) {
                        account.user = a;
                    });

                    Transaction.query({id: 'all', accountId: account.id}, function(tsx) {
                        $scope.transactions = tsx;
                    });

                    AccountBalance.get({id: account.id}, function(b) {
                        $scope.balance = b;
                        $scope.bsis = {};
                        var charges = [];

                        if (b.accountBalance > 0) $scope.balanceStyle = 'balance-paid';
                        else if (b.accountBalance < 0) $scope.balanceStyle = 'balance-unpaid';

                        for (var c in b.charges) {
                            var charge = b.charges[c];

                            charge.dueDate = charge.dueOn;
                            charge.bankAccount = charge.description;

                            if (!( charge.billingSchemeInstance in $scope.bsis )) {
                                $scope.bsis[charge.billingSchemeInstance] = 42;
                            }

                            charges.push(charge);
                        }

                        var latch = Object.keys($scope.bsis).length;

                        for (var bsi in $scope.bsis) {
                            BillingSchemeInstance.get({id: bsi}, function(r) {
                                $scope.bsis[r.id] = r;
                                BillingScheme.get({id: r.scheme}, function (bs) {
                                    $scope.bsis[r.id].scheme = bs;

                                    latch--;

                                    if (latch == 0) {
                                        for (var c in charges) {
                                            var charge = charges[c];
                                            charge.bsi = $scope.bsis[charge.billingSchemeInstance];
                                            charge.bankAccount = charge.bsi.scheme.description;
                                            charge.amount = charge.bsi.scheme.amount;

                                            $scope.transactions.push(charge);
                                        }
                                    }
                                });
                            });
                        }
                    });

                    $scope.code = '+++' + account.code.substr(0, 3) + '/' + account.code.substr(3, 4) + '/' +
                        account.code.substr(7, 5) + '+++';
                });

                $scope.update = function () {
                    $scope.account.$save();
                };

                $scope.load_accounts = function() {
                    $scope.reassign.accounts = [];
                    Account.query({id: 'all'}, function (r) {
                        angular.forEach(r, function(acc) {
                            User.get({id: acc.owner}, function(a) {
                                acc.label = 'Owner: ' + a.name + ' ' + a.lastName + ' | ' + acc.description;
                                $scope.reassign.accounts.push(acc);
                            });
                        });
                    });
                };

                $scope.do_reassign = function(target_account) {
                    Transaction.post({id: 'reassign', accountId: $scope.id}, {target: target_account.id}, function (r) {
                        console.log(r);
                        $scope.reassign.active = false;
                    });
                };
            }
        ]
    );
});
