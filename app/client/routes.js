var includes = [
    'app',
    'noop',

    // reference services
    '/app/services/translationService.js',
    '/app/services/menuService.js'
];

define(includes, function(app){

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

    app.run(function($rootScope) {

        $rootScope.lang = (navigator.language || navigator.userLanguage).split(/-/g)[0];

        // Test the other languages
        //$rootScope.lang = 'nl';
    });

});
