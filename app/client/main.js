
require.config({
    paths: {
        // 3e party dependencies
        'jquery':   '/src/jquery',
        'angular':  '/src/angular',
        'angular-route':  '/src/angular-route',

        // application dependencies
        'app':      '/app/app'
    },
    shims: {
        'angular': {
            deps: [ 'jquery' ]
        },
        'angular-route': {
            deps: [ 'angular' ]
        },
        'app': {
            deps: [ 'angular' ]
        }
    }
});


define(['jquery', 'angular'], function() {

    // initialize the ck namespace
    window.ck = {};

    require(['routes'], function() {
        angular.bootstrap(document, ['app']);
    });

});