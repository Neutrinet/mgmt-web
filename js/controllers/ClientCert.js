/**
 * Created by wannes on 12/13/14.
 */
define(['app'], function (app) {
    "use strict";

    app.controller('ClientCert',
        ['$scope', '$routeParams', '$http', '$location', '$rootScope', 'Client', 'User', 'Certificate',
            function ($scope, $routeParams, $http, $location, $rootScope, Client, User, Certificate) {
                $scope.id = $routeParams.id;
                $scope.clientId = $routeParams.clientId;
                $scope.csr = {};
                $scope.noCert = false;
                $scope.csr['extendedValidity'] = false;

                Certificate.query({clientId: $scope.clientId, id: 'all', active: true}, function (certificates) {
                    if (certificates.length == 0) {
                        $scope.noCert = true;
                        return;
                    }

                    $scope.cert = certificates[0];

                    Certificate.get({clientId: $scope.clientId, id: $scope.cert.id, raw: 'yes'}, function (raw) {
                        try {
                            var cert = new X509();
                            var rawstr = "";
                            for (var i in raw) {
                                rawstr += raw[i];
                            }
                            cert.readCertPEM(rawstr);

                            $scope.cert.issuer = cert.getIssuerString().replace(/\//g, '\n');
                            $scope.cert.notBefore = cert.getNotBefore();
                            $scope.cert.notAfter = cert.getNotAfter();
                            $scope.cert.subject = cert.getSubjectString().replace(/\//g, '\n');
                        } catch (e) {
                            $rootScope.message = e.message;
                        }
                    });
                });

                $scope.rekey = function () {
                    var id = 'new';
                    if (!$scope.noCert) {
                        id = $scope.cert.id;
                    }

                    var validityTerm = ($scope.csr['extendedValidity'] ? '5' : '1');

                    Certificate.put({clientId: $scope.clientId, id: id, rekey: !$scope.noCert, validityTerm: validityTerm}, $scope.csr.text, function (cert) {
                        $rootScope.message = 'Successfully rekeyed';
                        $scope.id = cert.id;

                        Certificate.get({clientId: $scope.clientId, id: $scope.id, raw: 'yes'});
                    });
                };

                $scope.viewClient = function() {
                    $location.path('/client/' + $scope.clientId);
                }
            }
        ]
    );
});
