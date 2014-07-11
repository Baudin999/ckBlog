
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
        'app':                  '/app/app',
        'noop':                  '/app/controllers/noop',
        'component-resolver':   '/app/directives/componentResolver',
        'ckMetro':              '/app/directives/metroUIDirectives',
        'ckForms':              '/app/directives/formDirectives',
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
        'app': {
            deps: [ 'angular', 'string-format' ]
        },
        'metro-min': {
            deps: [ 'jquery-ui' ]
        }
    }
});

define(['jquery', 'jquery-ui', 'angular', 'string-format'], function() {

    // initialize the ck namespace
    window.ck = {};

    require(['routes'], function() {
        angular.bootstrap(document, ['app']);
    });


    require(['metro-loader']);

});