/**
 * Created by ckelkboom on 9-7-14.
 */


define(['app'], function(app) {


    app.service('toolbarService', function($rootScope, $location, $log) {
        var _toolbarItems = [];
        this.createToolbar = function(toolbarItems) {
            _toolbarItems = toolbarItems;
            $rootScope.$broadcast('toolbarChanged', toolbarItems);
        };

        $(window).keyup(function(e) {

            var keyCode;

            // alt-s
            if (e.altKey && !e.ctrlKey && !e.shiftKey && e.keyCode == 83) {
                // save something
                keyCode = 'alt-s';
            }

            // insert
            else if (!e.altKey && !e.ctrlKey && !e.shiftKey && e.keyCode == 45) {
                // do insert thingy
                keyCode = 'ins';
            }

            // home
            else if (e.altKey && !e.ctrlKey && !e.shiftKey && e.keyCode == 72) {
                $rootScope.$apply(function() {
                    $location.path('/home');
                });
            }

            // dashboard
            else if (e.altKey && !e.ctrlKey && !e.shiftKey && e.keyCode == 68) {
                $rootScope.$apply(function() {
                    $location.path('/dashboard');
                });
            }


            if (keyCode) {
                _toolbarItems.map(function(toolbarItem) {
                    if (toolbarItem.handler && toolbarItem.keyCode === keyCode) {
                        $rootScope.$apply(function() {
                            toolbarItem.handler();
                        });
                    }
                });
            }

        });

    });

});