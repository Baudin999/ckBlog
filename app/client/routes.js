define(['app', 'noop'], function(app){

    // configure the route provider
    app.config(['$routeProvider', 'routeResolverProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
        function ($routeProvider, routeResolverProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {

            app.register = {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service
            };

            //Define routes - controllers will be loaded dynamically
            var route = routeResolverProvider.route;

            $routeProvider
                // simple pages
                .when('/', route.resolve('dashboard'))
                .when('/dashboard', route.resolve('dashboard'))
                .when('/home', route.resolve('home'))

                // default redirect
                .otherwise({ redirectTo: '/not-found' });
    }]);

});
