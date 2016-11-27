/**
 * Created by wannes on 8/10/14.
 */

define([], function () {
    var api = angular.module('api', ['ngResource'], function() {
        this.BASE_URL = 'https://localhost:8443/';
        // var BASE_URL = 'https://vpn.neutrinet.be/'

        this.API_ENDPOINT = this.BASE_URL + 'api';
    });

    api.factory('User', ['$resource', function ($resource) {
        "use strict";

        return $resource(API_ENDPOINT + '/user/:id',
            {id: '@id'}, {
                'get': {isArray: false},
                'query': {isArray: true},
                'post': {method: 'post'}
            });
    }]);

    api.factory('Client', ['$resource', function ($resource) {
        "use strict";

        return $resource(API_ENDPOINT + '/client/:id',
            {id: '@id'}, {
                'get': {isArray: false},
                'query': {isArray: true},
                'put': {method: 'put'}
            });
    }]);

    api.factory('Certificate', ['$resource', function ($resource) {
        "use strict";

        return $resource(API_ENDPOINT + '/client/:clientId/cert/:id',
            {clientId: '@clientId', id: '@id'}, {
                'get': {isArray: false},
                'query': {isArray: true},
                'put': {method: 'put'}
            });
    }]);

    api.factory('Connection', ['$resource', function ($resource) {
        "use strict";

        return $resource(API_ENDPOINT + '/client/:clientId/connection/:id',
            {clientId: '@clientId', id: '@id'}, {
                'get': {isArray: false},
                'query': {isArray: true}
            });
    }]);

    api.factory('AddressLease', ['$resource', function ($resource) {
        "use strict";

        return $resource(API_ENDPOINT + '/address/lease/:id',
            {id: '@id'}, {
                'get': {isArray: false},
                'query': {isArray: true},
                'put': {method: 'put'}
            });
    }]);

    api.factory('SubnetLease', ['$resource', function ($resource) {
        "use strict";

        return $resource(API_ENDPOINT + '/subnet/lease/:id',
            {id: '@id'}, {
                'get': {isArray: false},
                'query': {isArray: true},
                'put': {method: 'put'}
            });
    }]);

    api.factory('UserLogin', ['$resource', function ($resource) {
        "use strict";

        return $resource(API_ENDPOINT + '/user/login',
            {}, {
                'get': {isArray: false},
                'post': {method: 'post'}
            });
    }]);

    api.factory('DNSRecord', ['$resource', function ($resource) {
        "use strict";

        return $resource(API_ENDPOINT + '/dns/:zone/:id',
            {zone: '@zone', id: '@id'}, {
                'get': {isArray: false},
                'query': {isArray: false},
                'post': {method: 'post'}
            });
    }]);

    return api;

});
