


require.config({
    paths: {
        // 3e party dependencies
        'jquery':   '/src/jquery',
        'jquery-ui':   '/src/jquery-ui.min',
        'angular':  '/src/angular',
        'angular-route':  '/src/angular-route',
        'ngStorage':  '/src/ngStorage',

        // load the metro js files
        'metro-min': '/src/metro.min',

        // the minimum file does not work at the moment. It has some issues
        // with dependencies. I now load the metro UI files through the loader
        // which appends the separate scripts to the header.
        'metro-loader':             '/src/metro-loader',
        'metro-core':               '/src/metro-core',
        'metro-global':             '/src/metro-global',
        'metro-dropdown':           '/src/metro-dropdown',
        'metro-plugin-template':    '/src/metro-plugin-template',

        // application dependencies
        'ckMetro':              '/app/directives/metroUIDirectives',
        'ckForms':              '/app/directives/formDirectives',
        'component-resolver':   '/app/directives/componentResolver',
        'translations':         '/app/directives/translationsDirectives',
        'string-format':        '/app/core/string.format'
    },
    shims: {
        'jquery-ui': {
            deps: [ 'jquery' ]
        },
        'angular': {
            deps: [ 'jquery' ]
        },
        'angular-route': {
            deps: [ 'angular' ]
        },
        'metro-min': {
            deps: [ 'jquery-ui' ]
        }
    }
});


var includes = [
    'jquery-ui',
    'angular-route',
    'ngStorage',
    'string-format',
    'translations',
    'ckMetro',
    'ckForms'
];

define(['jquery', 'angular' ], function() {

    require(includes, function() {
        var module = angular.module('login-module', ['ckMetro', 'ngStorage', 'ckForms', 'ckTranslations']);

        // the login controller
        module.controller('loginController', function($rootScope, $scope, $http) {

            $http.get('/translations/login').success(function(translations) {
                $rootScope.translations = translations;
                $('body').show();
            });

            $scope.model = {};
        });


        // the create account controller
        module.controller('createAccountController', function($rootScope, $scope, $http) {
            var timeout;

            $http.get('/translations/createAccount').success(function(translations) {
                $rootScope.translations = translations;
                $('body').show();
            });

            $scope.model = {};

            $scope.handlers = {
                userNameValidationHandler: function(username, options) {

                    if (!username || username.length == 0) return true;

                    clearTimeout(timeout);
                    timeout = setTimeout(function() {
                        $http.put('/validate/username', { username: username }).then(function(result) {
                            options.setIsValid(result.data.isValid, 'Username already in use');
                        });
                    }, 300);

                    return true;
                }
            };

            $scope.submit = function() {
                if ($scope.model.password1 !== $scope.model.password2) return;

                // manipulate the model
                $scope.model.password = $scope.model.password1;
                delete $scope.model.password1;
                delete $scope.model.password2;

                $http.post('/createAccount', $scope.model).then(function(response) {
                    if (response.status == 200) {
                        $http.post('/login', $scope.model).then(function(response) {
                            if (response.status == 200) {
                                window.location = '/';
                            }
                        });
                    }
                });
            };

            $scope.cancel = function() {
                window.location = '/login';
            };

        });

        module.run(function($rootScope) {
            //$rootScope.lang = (navigator.language || navigator.userLanguage).split(/-/g)[0];
            $rootScope.lang = 'nl';
            $rootScope.isDebug = true;
        });

        angular.bootstrap(document, ['login-module']);

    });

});

