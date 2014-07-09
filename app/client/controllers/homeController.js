
define(['app'], function(app){
   app.register.controller('homeController', function($scope, $http, translationService, menuService) {
       $scope.title = 'Quizzer home';


       translationService.get('home').then(function(translations) {
            $scope.translations = translations;
       });

        menuService.alert('called from home controller');
   });
});
