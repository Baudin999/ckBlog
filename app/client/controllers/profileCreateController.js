

define(['app'], function(app) {

    var controller = function($scope, menuService) {
        $scope.title = 'Profile';

        menuService.createBreadcrumbTrail([
            { title: 'Create your profile', url: '#/profile/create', cssClass: 'fa fa-user' }
        ]);
    };

    app.register.controller('profileCreateController', ['$scope', 'menuService', controller]);
});