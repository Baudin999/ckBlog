
define(['angular-route', 'ngStorage', 'routeResolver', 'component-resolver', 'translations', 'ckMetro', 'ckForms'], function() {
    return angular.module('app', ['ngRoute', 'ngStorage', 'routeResolverServices', 'ckComponents', 'ckTranslations', 'ckMetro', 'ckForms']);
});
