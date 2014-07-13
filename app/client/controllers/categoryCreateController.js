

// define an empty controller
define(['app'], function(app) {

    // empty controller
    var controller = function($scope, $location, $log, menuService, toolbarService) {
        $scope.title = 'Create new category';
        $scope.saveCategory = function() {
            $log.debug('Saving the new category.');
            $location.path('/categories');
        };

        $scope.model = { };
        $scope.break = function() {
            var foo = this.model.firstName;
            debugger;
        }

        menuService.createBreadcrumbTrail([
            { title: 'Categories', url: '#/categories', cssClass: 'fa fa-category' },
            { title: 'Create new', url: '#/categories/create', cssClass: 'fa fa-plus' }
        ]);

        toolbarService.createToolbar([
            { title: 'Save', cssClass:'fa fa-save', type: 'button', handler: $scope.saveCategory, keyCode: 'alt-s' }
        ]);
    };

    app.register.controller('categoryCreateController', [ '$scope', '$location', '$log', 'menuService', 'toolbarService', controller]);

});