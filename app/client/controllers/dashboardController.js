
define(['app'], function(app){
   app.register.controller('dashboardController', function($scope, $http) {
        $scope.title = 'Dashboard';

       $http.get('/questions').success(function(questions) {
          $scope.questions = questions;
       });

   });
});
