

define(function() {

    var componentModule = angular.module('ckComponents', []);

    componentModule.directive('component', function($compile) {

        var getTemplateUrl = function(name) {
            return ' \'/app/components/{0}\' '.format(name);
        };

        var createTemplate = function ($attributes) {
            var template = '<div data-ng-controller="{0}" data-ng-include="{1}"></div>'
                .format(
                    $attributes.controllerName,
                    getTemplateUrl($attributes.templateName));

            return template;
        };

        return {
            restrict: 'E',
            scope: {
                controllerName: '@',
                templateName: '@'
            },
            link: function($scope, $element, $attributes) {

                // we require the component's js module
                require(['/app/components/{0}.js'.format($scope.controllerName)], function(ctrl) {

                    // once fetched we can create the actual HTML template and compile this into a
                    // what I call AngularJS widget.
                    $compile(createTemplate($attributes))($scope, function(component, scope){

                        // we append this widget to the $element
                        $element.append(component);

                        var elementContent = $element[0].innerHTML;

                        // this check repeatedly checks if the element's content has changed. When it has
                        // we fire the $.Metro.initAll function to reinit all the controls in the
                        // in the right function and sequence.
                        (function checkElementContent() {
                            setTimeout(function() {
                                if (elementContent === $element[0].innerHTML) checkElementContent();
                                $.Metro.initAll();
                            }, 5);
                        }());

                    });

                });
            }
        };
    });

});

