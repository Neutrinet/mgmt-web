/**
 * Created by wannes on 10/26/14.
 */
define(['app'], function (app) {
    app.controller('ClientLeases',
        ['$scope', '$routeParams', '$http', '$location', 'Client', 'User', 'AddressLease', 'SubnetLease',
            function ($scope, $routeParams, $http, $location, Client, User, AddressLease, SubnetLease) {
                "use strict";

                $scope.userId = $routeParams.id;
                $scope.user = User.get({id: $scope.userId}, function (user) {
                    $scope.user = user;
                    $scope.clients = Client.query({id: 'all', user: $scope.user.id});
                });

                $scope.prefix = '128';
                $scope.noIPv4 = false;

                $scope.pickClient = function (event, client) {
                    event.currentTarget.classList.add('bg-info');

                    $scope.client = client;
                    if (client.leases.length < 1) {
                        $scope.noIPv4 = true;
                    }
                };

                $scope.addIPv4Address = function() {
                    AddressLease.put({client:$scope.client.id, version:4, id:'new'}, function(lease) {
                        $scope.client.leases.push(lease);
                        $scope.noIPv4 = false;
                    });
                };

                $scope.assignLease = function () {
                    // workaround for Angular refusing to update the model value
                    $scope.prefix = document.getElementById("prefix").value;
                    SubnetLease.put({
                        id: 'new',
                        client: $scope.client.id,
                        version: 6,
                        prefix: $scope.prefix
                    }, function (result) {

                    })
                };

                $scope.toggleSubnetLease = function (sl) {
                    SubnetLease.get({id:sl.id}, function(lease) {
                        lease.active = !sl.active;
                        lease.$save();
                        sl.active = !sl.active;
                    });
                };

                $scope.toggleAddressLease = function (al) {
                    AddressLease.get({id:al.id}, function(lease) {
                        lease.active = !al.active;
                        lease.$save();
                        al.active = !al.active;
                    });
                };

                $scope.deleteSubnetLease = function (sl) {
                    SubnetLease.get({id:sl.id}, function(lease) {
                        lease.$delete();
                        $scope.client.subnetLeases.remove(sl);
                    });
                }
            }
        ]
    );
});
