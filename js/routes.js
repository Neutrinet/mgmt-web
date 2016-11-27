define([], function()
{
    return {
        defaultRoutePath: '/',
        routes: {
            '/': {
                templateUrl: 'views/overview.html',
                dependencies: [
                    'controllers/Overview'
                ],
                label: 'Overview'
            },
            '/user': {
                templateUrl: 'views/userList.html',
                dependencies: [
                    'controllers/CommonListController',
                    'controllers/UserList'
                ],
                label: 'Users'
            },
            '/user/login': {
                templateUrl: 'views/userLogin.html',
                dependencies: [
                    'controllers/UserLogin'
                ],
                label: 'Login'
            },
            '/user/:id': {
                templateUrl: 'views/userDetails.html',
                dependencies: [
                    'controllers/UserDetails'
                ],
                label: 'User detail'
            },
            '/client': {
                templateUrl: 'views/clientList.html',
                dependencies: [
                    'controllers/CommonListController',
                    'controllers/ClientList'
                ],
                label: 'Clients'
            },
            '/client/add': {
                templateUrl: 'views/clientAdd.html',
                dependencies: [
                    'controllers/ClientAdd'
                ],
                label: 'Add'
            },
            '/client/:id': {
                templateUrl: 'views/clientDetails.html',
                dependencies: [
                    'controllers/ClientDetails',
                    'vendor/jsrsasign-4.7.0-all-min',
                    'vendor/FileSaver'
                    // 'directives/app-color'
                ],
                label: 'Client detail'
            },
            '/user/:id/lease': {
                templateUrl: 'views/clientLeases.html',
                dependencies: [
                    'controllers/ClientLeases'
                    // 'directives/app-color'
                ],
                label: 'Client IP lease assignment'
            },
            '/client/:clientId/cert/:id': {
                templateUrl: 'views/clientCert.html',
                dependencies: [
                    'controllers/ClientCert',
                    'vendor/jsrsasign-4.7.0-all-min'
                ],
                label: 'Client certificate'
            },
            '/dns': {
                templateUrl: 'views/dnsRecordList.html',
                dependencies: [
                    'controllers/DNSRecordList'
                ],
                label: 'DNS'
            },
            '/dns/:id': {
                templateUrl: 'views/dnsRecordDetail.html',
                dependencies: [
                    'controllers/DNSRecordDetails'
                ],
                label: 'Record'
            },
            '/account': {
                templateUrl: 'views/accountList.html',
                dependencies: [
                    'controllers/CommonListController',
                    'controllers/AccountList'
                ],
                label: 'Accounts'
            },
            '/account/:id': {
                templateUrl: 'views/accountDetails.html',
                dependencies: [
                    'controllers/AccountDetails'
                ],
                label: 'Status'
            },
            '/admin/billing': {
                templateUrl: 'views/admin/billing.html',
                dependencies: [
                    'controllers/CommonListController',
                    'controllers/admin/Billing'
                ],
                label: 'Billing'
            }
        }
    };
});