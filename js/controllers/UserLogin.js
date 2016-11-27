/**
 * Created by wannes on 12/22/14.
 */
define(['app'], function (app) {
    app.controller('UserLogin',
        ['$scope', '$rootScope', '$location', '$http', 'User', 'UserLogin', function ($scope, $rootScope, $location, $http, User, UserLogin) {
            $scope.cred = {};
            $scope.loggedIn = $rootScope.user != null && $rootScope.user.name != 'unknown' && $rootScope.username != '';

            $scope.login = function () {
                "use strict";

                UserLogin.post({user: $scope.cred.user, password: $scope.cred.password}, function (r) {
                    $rootScope.user = r.user;
                    $rootScope.cred = {};

                    $http.defaults.headers.common.Session = r.token;

                    $location.path('/');
                }, function(response, headers) {
                    if (response.status === 401) {
                        $scope.message = 'Incorrect user/password. Please try again or <a href="/forgotpassword">reset</a> password';
                    } else {
                        $rootScope.message = 'Login failed. Please try again later';
                    }
                })
            };

            $scope.logout = function() {
                $rootScope.user = {name: 'unknown'};
                $rootScope.cred = {};

                $http.defaults.headers.common.Session = '';

                $location.path('/');
            };
        }
        ]
    );
});
