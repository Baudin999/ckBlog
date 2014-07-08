

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
                require(['/app/components/{0}.js'.format($scope.controllerName)], function(ctrl) {

                    $element.html(createTemplate($attributes)).show();
                    $compile($element.contents())($scope);

                });
            }
        };
    });

});

