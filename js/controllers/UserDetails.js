/**
 * Created by wannes on 10/19/14.
 */
define(['app'], function (app) {
    "use strict";

    app.controller('UserDetails',
        ['$scope', '$routeParams', '$rootScope', 'User', function ($scope, $routeParams, $rootScope, User) {
            $scope.id = $routeParams.id;
            $scope.user = User.get({id: $scope.id});
            $scope.changePassword = {
                password: '',
                confirm: '',
                active: false
            };

            $scope.update = function () {
                $scope.user.$save();
                $scope.user = User.get({id: $scope.id});
            };

            $scope.updatePassword = function () {
                User.post({id: $scope.id, changePassword: true}, {password: $scope.changePassword.password, id: $scope.id}, function (r) {
                    $rootScope.message = 'Password successfully updated';
                    $scope.changePassword.active = false;
                });
            };
        }
        ]
    );
});
