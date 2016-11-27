define(['app'], function (app) {
    app.controller('UserList',
        [ '$scope', 'User', function ($scope, User) {
            $scope.users = User.query({id:'all'});

            // mix in list stuff
            app.CommonListController($scope);
            }
        ]
    );
});