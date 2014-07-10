

define(['app'], function(app) {

    // the main menu controller
    app.register.controller('main-menu', function($scope, $timeout) {

        $scope.title = 'Quizzer';
        $scope.breadcrumbs = [
            { title: 'Home', url: '#/home', cssClass: 'icon-home' }
        ];
        $scope.toolbarItems = [];
        $scope.language = (navigator.language || navigator.userLanguage);
        $scope.quickLinks = [
            { title: 'Home', url: '#/home', cssClass: 'icon-home' },
            { title: 'Dashboard', url: '#/dashboard', cssClass: 'icon-dashboard' }
        ];

        $scope.$on('breadcrumbChanged', function(event, breadcrumbs) {
            breadcrumbs.map(function(breadcrumb) {
                $scope.breadcrumbs.push(breadcrumb);
            });
        });

        $scope.$on('toolbarChanged', function(event, toolbarItems) {
            $scope.toolbarItems = toolbarItems;
        });

        $scope.$on('$routeChangeStart', function(next, current) {
            $scope.breadcrumbs.splice(1, $scope.breadcrumbs.length - 1);
            $scope.toolbarItems = [];
        });
    });

});