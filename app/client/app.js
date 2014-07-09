
define(['angular-route', 'ngStorage', 'routeResolver', 'component-resolver', 'translations'], function() {
    return angular.module('app', ['ngRoute', 'ngStorage', 'routeResolverServices', 'ckComponents', 'ckTranslations']);
});
