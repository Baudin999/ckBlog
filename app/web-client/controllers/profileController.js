

define(['app'], function(app) {

    var controller = function($scope, menuService) {
        $scope.title = 'Profile';

        menuService.createBreadcrumbTrail([
            { title: 'Profile', url: '#/profile', cssClass: 'fa fa-user' }
        ]);
    };

    app.register.controller('profileController', ['$scope', 'menuService', controller]);
});