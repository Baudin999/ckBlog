

define(['app'], function(app){
    var controller = function($scope, translationService, menuService) {
        $scope.title = 'categoriesEditController';

        $scope.navigate = function(path) {
           $location.path(path);
        };

        translationService.get('home').then(function(translations) {
            $scope.translations = translations;
        });
    };

    app.register.controller('categoriesEditController', ['$scope', 'translationService', 'menuService', controller]);
});
