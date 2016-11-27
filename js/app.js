define(['routes', 'services/dependencyResolverFor'], function (config, dependencyResolverFor) {
    var app = angular.module('app', ['ngRoute', 'ngSanitize', 'ng-breadcrumbs', 'angular-loading-bar', 'ngAnimate',
        'api', 'billing-api', 'toggle-switch', 'ui.bootstrap']);

    app.config(
        [
            '$routeProvider',
            '$locationProvider',
            '$controllerProvider',
            '$compileProvider',
            '$filterProvider',
            '$httpProvider',
            '$provide',

            function ($routeProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $httpProvider, $provide) {
                app.controller = $controllerProvider.register;
                app.directive = $compileProvider.directive;
                app.filter = $filterProvider.register;
                app.factory = $provide.factory;
                app.service = $provide.service;

                $provide.decorator('$sniffer', function ($delegate) {
                    $delegate.history = false;
                    return $delegate;
                });

                $locationProvider.html5Mode(true);

                if (config.routes !== undefined) {
                    angular.forEach(config.routes, function (route, path) {
                        $routeProvider.when(path, {
                            templateUrl: route.templateUrl,
                            resolve: dependencyResolverFor(route.dependencies),
                            label: route.label
                        });
                    });
                }

                if (config.defaultRoutePath !== undefined) {
                    $routeProvider.otherwise({redirectTo: config.defaultRoutePath});
                }

                //Http Interceptor to check auth failures for xhr requests
                $httpProvider.interceptors.push('authHttpResponseInterceptor');
            }
        ])
        .factory('authHttpResponseInterceptor', ['$q', '$location', function ($q, $location) {
            return {
                response: function (response) {
                    if (response.status === 401) {
                        console.log("Response 401");
                    }
                    return response || $q.when(response);
                },
                responseError: function (rejection) {
                    if (rejection.status === 401) {
                        console.log("Response Error 401", rejection);
                        $location.path('/user/login');
                    }
                    return $q.reject(rejection);
                }
            }
        }])
        .directive("textfile", [function () {
            return {
                scope: {
                    textfile: "="
                },
                link: function (scope, element, attributes) {
                    element.bind("change", function (changeEvent) {
                        var reader = new FileReader();
                        reader.onload = function (loadEvent) {
                            scope.$apply(function () {
                                scope.textfile = loadEvent.target.result;
                            });
                        };
                        reader.readAsText(changeEvent.target.files[0]);
                    });
                }
            }
        }]);

    app.run(['$rootScope', 'breadcrumbs', 'UserLogin', function ($rootScope, breadcrumbs, UserLogin) {
        $rootScope.breadcrumbs = breadcrumbs;
        $rootScope.user = {name: 'unknown'};
        UserLogin.get({}, function (session) {
            "use strict";
            if (session != null)
                $rootScope.user = session.user;
        });
        $rootScope.cred = {};
        $rootScope.message = '';
    }]);

    return app;
});