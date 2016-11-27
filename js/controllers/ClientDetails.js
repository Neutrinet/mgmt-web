/**
 * Created by wannes on 10/19/14.
 */
define(['app'], function (app) {
    app.controller('ClientDetails',
        ['$scope', '$routeParams', '$http', '$location', 'Client', 'User', 'Certificate', 'Connection',
            function ($scope, $routeParams, $http, $location, Client, User, Certificate, Connection) {
                $scope.id = $routeParams.id;
                $scope.noCert = false;

                Client.get({id: $scope.id}, function (client) {
                    "use strict";
                    $scope.client = client;
                    $scope.user = User.get({id: $scope.client.userId});
                    $scope.switchStatus = $scope.client.enabled == 1;

                    Certificate.query({clientId: $scope.client.id, id: 'all', active: true}, function (certificates) {
                        if (certificates.length == 0) {
                            $scope.noCert = true;
                            return;
                        }

                        $scope.cert = certificates[0];

                        Certificate.get({clientId: $scope.client.id, id: $scope.cert.id, raw: 'yes'}, function (raw) {

                            var cert = new X509();
                            var rawstr = "";
                            for (var i in raw) {
                                rawstr += raw[i];
                            }
                            cert.readCertPEM(rawstr);

                            $scope.cert.issuer = cert.getIssuerString();
                            $scope.cert.notBefore = cert.getNotBefore();
                            $scope.cert.notAfter = cert.getNotAfter();
                            $scope.cert.subject = cert.getSubjectString();
                        });
                    });

                    Connection.query({clientId: $scope.client.id, id: 'all'}, function (connections) {
                        $scope.connections = connections;
                    });
                });

                $scope.downloadConfig = function() {
                    "use strict";

                    $http({method: 'POST', url: API_ENDPOINT + '/client/' + $scope.client.id + '/config',
                        headers: {}, responseType: 'blob', data: {platform:'linux'}})
                        .then(function(response) {
                            var blob = new Blob([response.data], {type: 'application/zip; charset=utf-8'});
                            saveAs(blob, 'client-' + $scope.client.id + '.zip');
                    });
                };

                $scope.$watch('switchStatus', function(v) {
                    "use strict";

                    if ($scope.client === undefined) return;

                    $scope.client.enabled = v;
                    $scope.update();
                });

                $scope.update = function () {
                    $scope.client.$save();
                };

                $scope.modifyClientLeases = function() {
                    "use strict";
                    $location.path('/user/' + $scope.client.userId + '/lease');
                };

                $scope.delete = function() {
                    "use strict";
                    $scope.client.$delete().then(function () {
                        $location.path('/client');
                    });
                }

                $scope.newKeypair = function() {
                    "use strict";
                    $location.path('/client/' + $scope.client.id + '/cert/all');
                }
            }
        ]
    );
});
