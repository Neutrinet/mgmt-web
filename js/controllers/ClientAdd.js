/**
 * Created by wannes on 2/14/15.
 */

define(['app'], function (app) {
    "use strict";

    app.controller('ClientAdd',
        ['$scope', '$location', '$rootScope', 'Client', 'User', 'Certificate',
            function ($scope, $location, $rootScope, Client, User, Certificate) {
                $scope.cert = {};
                $scope.noCert = false;
                $scope.client = {};
                $scope.userCertId = $rootScope.user.certId;

                $scope.addClient = function () {
                    $scope.user = $rootScope.user.id;

                    Client.put({clientId:'new'}, $scope.client, function(r) {
                        if ($scope.cert != 'undefined' && $scope.cert != '') {
                            $scope.coupleCert();
                        }
                    });
                };

                $scope.coupleCert = function () {
                    Certificate.put({clientId: $scope.client.id, id: 'new'}, $scope.cert.csr, function (cert) {
                        $rootScope.message = 'Successfully added keypair';
                        $scope.cert.id = cert.id;

                        Certificate.get({clientId: $scope.client.id, id: $scope.cert.id, raw: 'yes'});
                    });
                };

                $scope.viewClients = function() {
                    $location.path('/client');
                }
            }
        ]
    );
});
