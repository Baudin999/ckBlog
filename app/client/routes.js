define(['app', 'controllers/dashboardController'], function(app){

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            // simple pages
            .when('/', { controller: 'dashboardController', templateUrl: 'views/dashboard.html', reloadOnSearch: false })

            // default redirect
            .otherwise({ redirectTo: '/not-found' });
    }]);

});
