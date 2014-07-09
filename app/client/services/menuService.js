/**
 * Created by ckelkboom on 9-7-14.
 */


define(['app'], function(app) {


    app.service('menuService', function($q, $log) {

        this.alert = function(message) {
            $log.info(message);
        };

    });

});