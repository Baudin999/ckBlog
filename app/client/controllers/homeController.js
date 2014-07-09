
define(['app'], function(app){
   app.register.controller('homeController', function($scope, $http, translationService) {
        $scope.title = 'Quizzer home';
       translationService.get('home').then(function(translations) {
            $scope.translations = translations;
       });

   });
});
