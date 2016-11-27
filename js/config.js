/**
 * Created by wannes on 8/10/14.
 */
require.config({
    baseUrl: 'js',
    paths: {
        'angular': 'vendor/angular',
        'angular-route': 'vendor/angular-route',
        'angular-resource': 'vendor/angular-resource',
        'angular-ui': 'vendor/ui-bootstrap-tpls-0.13.0.min',
        'angular-animate': 'vendor/angular-animate.min',
        'angular-sanitize': 'vendor/angular-sanitize.min',
        'ng-breadcrumbs': 'vendor/ng-breadcrumbs.min',
        'angular-loading-bar': 'vendor/loading-bar.min',
        'angular-toggle-switch': 'vendor/angular-toggle-switch',
        'api': 'api/api',
        'billing-api': 'api/billing'
    },
    shim: {
        'app': {
            deps: ['angular', 'angular-route', 'angular-resource', 'angular-ui', 'billing-api',
                'ng-breadcrumbs', 'angular-loading-bar', 'api', 'angular-toggle-switch', 'angular-sanitize']
        },
        'angular-route': {
            deps: ['angular']
        },
        'angular-resource': {
            deps: ['angular']
        },
        'angular-ui': {
            deps: ['angular']
        },
        'angular-animate': {
            deps: ['angular']
        },
        'angular-sanitize': {
            deps: ['angular']
        },
        'api': {
            deps: ['angular', 'angular-route', 'angular-resource']
        },
        'billing-api': {
            deps: ['angular', 'angular-route', 'angular-resource']
        },
        'ng-breadcrumbs': {
            deps: ['angular', 'angular-route']
        },
        'angular-loading-bar': {
            deps: ['angular', 'angular-animate']
        },
        'angular-toggle-switch': {
            deps: ['angular', 'angular-animate']
        }
    }
});

require
(
    [
        'app'
    ],
    function(app)
    {
        angular.bootstrap(document, ['app']);
    }
);