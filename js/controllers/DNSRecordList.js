define(['app'], function (app) {
    app.controller('DNSRecordList',
        ['$scope', '$routeParams', 'DNSRecord', function ($scope, $routeParams, DNSRecord) {
            $scope.userId = $routeParams.user;
            $scope.combinedRecords = [];

            DNSRecord.query({zone: 'all', id: 'all', user: $scope.userId}, function (records) {
                $scope.records = records;
                // combine all records to one list
                for (var zone in $scope.records) {
                    if (zone.indexOf('$') != -1 || zone.indexOf('toJSON') != -1) continue;
                    var records = $scope.records[zone];
                    for (var i in records) records[i].zone = zone;
                    $scope.combinedRecords = $scope.combinedRecords.concat(records);
                }
            });

            $scope.addReverse = function() {
                "use strict";
                $location.path('/dns/new?type=PTR');
            };

            app.CommonListController($scope);
        }
        ]
    );
});