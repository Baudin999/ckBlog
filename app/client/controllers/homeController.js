
define(['app'], function(app){
   app.register.controller('homeController', function($rootScope, $scope, $http, $location, translationService, menuService) {
       $scope.title = 'Quizzer home';

       $scope.navigate = function(path) {
           $location.path(path);
       };

       translationService.get('general').then(function(translations) {
           $rootScope.translations = translations;
       });

       translationService.get('home').then(function(translations) {
            $scope.translations = translations;
       });
   });
});
