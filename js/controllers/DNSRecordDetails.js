/**
 * Created by wannes on 10/19/14.
 */
define(['app'], function (app) {
    "use strict";

    app.controller('DNSRecordDetails',
        ['$scope', '$routeParams', 'DNSRecord', function ($scope, $routeParams, DNSRecord) {
            $scope.id = $routeParams.id;
            if ($scope.id == 'new') {

            } else
                $scope.record = DNSRecord.get({zone: 'all', id: $scope.id});

            $scope.update = function () {
                $scope.record.$save();
            };
        }
        ]
    );
});
