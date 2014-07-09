
define(['angular-route', 'routeResolver', 'component-resolver', 'translations'], function() {
    return angular.module('app', ['ngRoute', 'routeResolverServices', 'ckComponents', 'ckTranslations']);
});
