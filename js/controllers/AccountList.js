define(['app'], function (app) {
    app.controller('AccountList',
        ['$scope', '$routeParams', '$location', 'Account', 'AccountBalance', 'User',
            function ($scope, $routeParams, $location, Account, AccountBalance, User) {
            $scope.userId = $routeParams.user;
            $scope.accounts = Account.query({id: 'all'}, function (r) {
                angular.forEach(r, function (account) {
                    AccountBalance.get({id: account.id}, function(b) {
                        account.balance = b;

                    });

                    User.get({id: account.owner}, function(a) {
                        account.user = a;
                    });
                });
            });

            app.CommonListController($scope);
        }
        ]
    );
});