
define(['app'], function(app){
   app.register.controller('homeController', function($scope, $http, $location, translationService, menuService) {
        $scope.title = 'Quizzer home';
        $scope.navigate = function(path) {
           $location.path(path);
       };

       translationService.get('home').then(function(translations) {
            $scope.translations = translations;
       });
   });
});
