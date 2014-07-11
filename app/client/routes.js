var includes = [
    'app',
    'noop',

    // reference services
    '/app/services/translationService.js',
    '/app/services/toolbarService.js',
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

                // accounts
                .when('/profile', route.resolve('profile'))

                // business routes
                .when('/categories', route.resolve('categories'))
                .when('/categories/create', route.resolve('categoryCreate'))

                // default redirect
                .otherwise({ redirectTo: '/not-found' });
    }]);

    app.run(function($rootScope) {

        $rootScope.lang = (navigator.language || navigator.userLanguage).split(/-/g)[0];

        $rootScope.$on('$viewContentLoaded', function() {
            $.Metro.initAll();
        });
    });

});
