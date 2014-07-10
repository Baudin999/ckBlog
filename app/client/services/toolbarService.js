/**
 * Created by ckelkboom on 9-7-14.
 */


define(['app'], function(app) {


    app.service('toolbarService', function($rootScope) {

        this.createToolbar = function(toolbarItems) {
            $rootScope.$broadcast('toolbarChanged', toolbarItems);
        };


    });

});