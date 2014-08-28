

define(['app'], function(app) {

    var controller = function($scope, menuService, translationService) {
        $scope.title = 'profileCreate_title';

        translationService.get('profileCreate').then(function(translations) {
            $scope.translations = translations;
        });
        menuService.createBreadcrumbTrail([
            { title: 'Create your profile', url: '#/profile/create', cssClass: 'fa fa-user' }
        ]);
    };

    app.register.controller('profileCreateController', ['$scope', 'menuService', 'translationService', controller]);
});