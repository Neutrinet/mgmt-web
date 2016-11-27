define(['app'], function (app) {
    app.controller('ClientList',
        ['$scope', '$routeParams', '$location', 'Client', function ($scope, $routeParams, $location, Client) {
            $scope.userId = $routeParams.user;
            $scope.clients = Client.query({id: 'all', user: $scope.userId, compose: true});
            $scope.backendURI = API_ENDPOINT;

            app.CommonListController($scope);

            $scope.addClient = function () {
                $location.path('/client/add');
            };
        }
        ]
    );
});