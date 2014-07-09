
define(['app'], function(app){
   app.register.controller('homeController', function($scope, $http) {
        $scope.title = 'Quizzer home';


       $http.get('/translations/home').success(function(translations) {
           $scope.translations = translations;
       });

   });
});
