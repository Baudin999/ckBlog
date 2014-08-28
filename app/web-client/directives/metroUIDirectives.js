


define([], function() {

    var module = angular.module('ckMetro', []);

    module.directive('tile', function() {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="tile bg-darkPink">' +
                        '<div class="tile-status">' +
                            '<span class="name">Default</span>' +
                        '</div>' +
                      '</div>'
        };
    });

});