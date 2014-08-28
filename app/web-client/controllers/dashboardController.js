
define(['app'], function(app){
   app.register.controller('dashboardController', function($rootScope, $scope, $http, menuService, translationService) {
        $scope.title = 'Dashboard';

       $http.get('/questions').success(function(questions) {
          $scope.questions = questions;
       });

       translationService.get('general').then(function(translations) {
           $rootScope.translations = translations;
       });


       menuService.createBreadcrumbTrail([
           { title: 'Dashboard', url: '#/dashboard', cssClass: 'fa fa-dashboard' }
       ]);

   });
});
