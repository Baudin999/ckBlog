




var includes = [
    'angular-route', 'angular-resource', 'ngStorage', 'angular-animate',
    'lodash', 'restangular', 'routeResolver', 'serviceResolver', 'component-resolver',
    'translations', 'ckMetro', 'ckForms'
];

define(includes, function() {
    return angular.module('app', [
        'ngRoute', 'ngResource', 'ngAnimate', 'ngStorage', 'restangular', 'ckRouteResolver', 'ckServiceResolver',
        'ckComponents', 'ckTranslations', 'ckMetro', 'ckForms']);
});




