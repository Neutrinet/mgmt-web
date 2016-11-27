/**
 * Created by wannes on 2/16/15.
 */
define(['app'], function (app) {
    "use strict";

    app.controller('Overview',
        ['$scope', '$routeParams', '$http', '$location', '$rootScope', 'Client', 'User', 'Certificate', 'Connection',
            'Account', 'AccountBalance',
            function ($scope,
                      $routeParams,
                      $http,
                      $location,
                      $rootScope,
                      Client,
                      User,
                      Certificate,
                      Connection,
                      Account,
                      AccountBalance
            ) {

                var keypairIsSetup = true;
                var noClientsHaveKeypair = true;

                Client.query({id:'all', user: $rootScope.user.id}, function(e) {
                    $scope.clients = e;

                    angular.forEach($scope.clients, function (client) {
                        client.connections = Connection.query({id:'all', clientId:client.id});

                        Certificate.query({id:'all', clientId:client.id}).$promise.then(function(c) {
                            if (c.length > 0) noClientsHaveKeypair = false;

                            if (noClientsHaveKeypair && $rootScope.user.certId == null) {
                                keypairIsSetup = false;
                            }
                        });
                    });
                });

                $scope.balanceStyle = 'balance-zero';

                Account.query({id: 'all', owner: true}, function (accounts) {
                    // todo: do something if user has multiple accounts
                    if (accounts.length > 0) {
                        AccountBalance.get({id: accounts[0].id}, function (b) {
                            $scope.balance = b;
                        });
                    }
                });

                $scope.goToClient = function(id) {
                    $location.path('/client/' + id);
                };
        }
        ]
    );
});
