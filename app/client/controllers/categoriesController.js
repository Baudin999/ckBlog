

define(['app'], function(app) {


    var controller = function($scope, $location, menuService, toolbarService) {
        var addCategory = function() {
            $location.path('/categories/create');
        };

        $scope.title = 'Categories';

        menuService.createBreadcrumbTrail([
            { title: 'Categories', url: '#/categories', cssClass: 'fa fa-category' }
        ]);

        toolbarService.createToolbar([
            { title: 'Add', cssClass:'fa fa-plus', type: 'button', handler: addCategory, keyCode: 'ins' }
        ]);
    };

    app.register.controller('categoriesController', ['$scope', '$location', 'menuService', 'toolbarService', controller]);

});