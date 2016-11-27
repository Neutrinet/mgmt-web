/**
 * Created by wannes on 22/05/15.
 */
define(['app'], function (app) {
    "use strict";

    app.controller('Billing',
        ['$scope', '$routeParams', '$http', '$location', '$rootScope', 'Client', 'User', 'BillingScheme',
            'BillingSchemeInstance', 'Account', 'AccountBalance', 'RecordBankImport',
            function ($scope,
                      $routeParams,
                      $http,
                      $location,
                      $rootScope,
                      Client,
                      User,
                      BillingScheme,
                      BillingSchemeInstance,
                      Account,
                      AccountBalance,
                      RecordBankImport
            ) {
                $scope.accounts = [];
                $scope.bsis = [];
                $scope.selectedAccount = null;
                $scope.import = {csv: ''};
                $scope.curOp = '';
                $scope.billingSchemes = {};
                $scope.selected = {
                    startDate: new Date()
                };


                $scope.dateOptions = {
                    formatYear: 'yyyy',
                    startingDay: 1
                };
                $scope.opened = false;

                $scope.open = function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    $scope.opened = true;
                };

                Account.query({id: 'all'}).$promise.then(function(accounts) {
                    angular.forEach(accounts, function(account) {
                        $scope.attachOwnerInfo(account);
                        $scope.accounts.push(account);
                    });
                });

                BillingScheme.query({id: 'all'}).$promise.then(function (bss) {
                    angular.forEach(bss, function(bs) {
                        $scope.billingSchemes[bs.id] = bs;
                    });
                });

                $scope.accountSelected = function(account) {
                    $scope.bsis = [];
                    $scope.selectedAccount = account;
                    BillingSchemeInstance.query({id: 'all', account: account.id}).$promise.then(function(r) {
                        angular.forEach(r, function(bsi) {
                            bsi.bs = $scope.billingSchemes[bsi.scheme];
                            $scope.bsis.push(bsi);
                        });
                    });
                };

                $scope.attachBillingScheme = function(bsi) {
                    BillingScheme.get({id: bsi.scheme}).$promise.then(function (bs) {
                        bsi.bs = bs;
                    });
                };

                $scope.attachOwnerInfo = function(account) {
                    User.get({id: account.owner}).$promise.then(function (user) {
                        account.ownerInfo = user;
                    });
                };

                $scope.createBillingInstance = function(scheme) {
                    BillingSchemeInstance.put({id: 'new'}, {scheme: scheme.id, account: $scope.selectedAccount.id, startedAt: $scope.selected.startDate}, function(r) {
                        $scope.bsis.push(r);
                        $scope.curOp = '';
                    });
                };

                $scope.importBankStatement = function() {
                    RecordBankImport.post({}, $scope.import.csv, function(r) {

                    });
                };

                app.CommonListController($scope);
            }
        ]
    );
});
