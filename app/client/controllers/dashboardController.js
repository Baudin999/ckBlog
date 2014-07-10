
define(['app'], function(app){
   app.register.controller('dashboardController', function($scope, $http, menuService) {
        $scope.title = 'Dashboard';

       $http.get('/questions').success(function(questions) {
          $scope.questions = questions;
       });

       menuService.createBreadcrumbTrail([
           { title: 'Dashboard', url: '#/dashboard', cssClass: 'fa fa-dashboard' }
       ]);

   });
});
