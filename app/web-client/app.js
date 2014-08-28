




var includes = [
    'angular-route', 'angular-resource', 'ngStorage',
    'lodash', 'restangular', 'routeResolver', 'serviceResolver', 'component-resolver',
    'translations', 'ckMetro', 'ckForms'
];

define(includes, function() {
    return angular.module('app', [
        'ngRoute', 'ngResource', 'ngStorage', 'restangular', 'ckRouteResolver', 'ckServiceResolver',
        'ckComponents', 'ckTranslations', 'ckMetro', 'ckForms']);
});




