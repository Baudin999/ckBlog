/**
 * Created by ckelkboom on 9-7-14.
 */


define(['app'], function(app) {


    app.service('menuService', function($rootScope) {

        this.createBreadcrumbTrail = function(breadcrumbs) {

            $rootScope.$broadcast('breadcrumbChanged', breadcrumbs);

        };


    });

});