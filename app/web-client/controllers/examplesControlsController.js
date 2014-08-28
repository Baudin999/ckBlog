

define(['app'], function(app){
    var controller = function($scope, translationService, menuService) {
        $scope.title = 'examplesControlsController';

        $scope.navigate = function(path) {
           $location.path(path);
        };

        translationService.get('home').then(function(translations) {
            $scope.translations = translations;
        });
    };

    app.register.controller('examplesControlsController', ['$scope', 'translationService', 'menuService', controller]);
});
