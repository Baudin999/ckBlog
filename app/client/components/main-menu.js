

define(['app'], function(app) {

    // the main menu controller
    app.register.controller('main-menu', function($scope, $timeout) {

        $scope.title = 'Quizzer';

        $scope.quickLinks = [
            { title: 'Home', url: '#/home', cssClass: 'icon-home' },
            { title: 'Dashboard', url: '#/dashboard', cssClass: 'icon-dashboard' }
        ];

    });

});