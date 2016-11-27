/**
 * Created by wannes on 2/19/15.
 */

define([], function () {

    var api = angular.module('billing-api', ['ngResource'], function() {
        this.BILLING_URL = BASE_URL + 'billing/';
    });

    api.factory('Account', ['$resource', function ($resource) {
        "use strict";

        return $resource(BILLING_URL + 'account/:id',
            {id: '@id'}, {
                'get': {isArray: false},
                'query': {isArray: true},
                'post': {method: 'post'}
            });
    }]);

    api.factory('AccountBalance', ['$resource', function ($resource) {
        "use strict";

        return $resource(BILLING_URL + 'account/:id/balance',
            {id: '@id'}, {
                'get': {isArray: false}
            });
    }]);

    api.factory('Transaction', ['$resource', function ($resource) {
        "use strict";

        return $resource(BILLING_URL + 'account/:accountId/transaction/:id',
            {id: '@id', accountId: '@accountId'}, {
                'get': {isArray: false},
                'query': {isArray: true},
                'post': {method: 'post'}
            });
    }]);

    api.factory('BillingScheme', ['$resource', function ($resource) {
        "use strict";

        return $resource(BILLING_URL + 'billing/scheme/:id',
            {id: '@id'}, {
                'get': {isArray: false},
                'query': {isArray: true}
            });
    }]);

    api.factory('BillingSchemeInstance', ['$resource', function ($resource) {
        "use strict";

        return $resource(BILLING_URL + 'billing/instance/:id',
            {id: '@id'}, {
                'get': {isArray: false},
                'query': {isArray: true},
                'post': {method: 'post'},
                'put': {method: 'put'}
            });
    }]);

    api.factory('Charges', ['$resource', function ($resource) {
        "use strict";

        return $resource(BILLING_URL + 'charges/:id',
            {id: '@id'}, {
                'get': {isArray: false},
                'query': {isArray: true},
                'post': {method: 'post'}
            });
    }]);

    api.factory('RecordBankImport', ['$resource', function ($resource) {
        "use strict";

        return $resource(BILLING_URL + 'import/recordbank',
            {}, {
                'post': {method: 'post'}
            });
    }]);
});