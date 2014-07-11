


define([], function() {

    var module = angular.module('ckMetro', []);

    module.directive('tile', function() {
        return {
            restrict: 'E',
            template: '<div class="tile bg-darkPink"></div>'
        };
    });

});