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
                .when('/profile/create', route.resolve('profileCreate'))

                // business routes 
 				.when('/subject/create', route.resolve('subjectCreate')) 
 				.when('/subject', route.resolve('subject'))

                .when('/categories', route.resolve('categories'))
                .when('/categories/create', route.resolve('categoryCreate'))
                .when('/categories/edit', route.resolve('categoriesEdit'))

                //examples
                .when('/examples/controls', route.resolve('examplesControls'))

                // default redirect
                .otherwise({ redirectTo: '/not-found' });
    }]);

    app.run(function($rootScope, $log, toolbarService, menuService) {

        //$rootScope.lang = (navigator.language || navigator.userLanguage).split(/-/g)[0];
        $rootScope.lang = 'nl';
        $rootScope.isDebug = true;



        $rootScope.$on('$viewContentLoaded', function() {
            $.Metro.initAll();
        });

        $rootScope.$on('$locationChangeSuccess', function(source, next, previous) {
            $log.debug('Navigating to: {0}'.format(next));
        });
    });

});
