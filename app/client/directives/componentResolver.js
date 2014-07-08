

define(['app'], function(app) {

    app.directive('component', function() {
        return {
            restrict: 'E',
            scope: {
                controllerName: '@',
                templateName: '@'
            },
            controller: function($scope) {



            }
        };
    });

});

