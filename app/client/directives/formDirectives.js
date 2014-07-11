

define([], function() {

    var module = angular.module('ckForms', []);

    module.directive('ckTextM', function() {

        var getTranslation = function(key) {
            return key;
        };

        return {
            restrict: 'E',
            templateUrl: '/app/templates/ck-text-m.html',
            scope: {
                cssClass: '@',
                title: '@',
                validationMessage: '@message'
            },
            controller: function($scope) {

                $scope.options = {
                    title: getTranslation($scope.title ? $scope.title : 'Field'),
                    name: ($scope.name ? $scope.name : 'Unknown'),
                    cssClass: ($scope.cssClass ? $scope.cssClass : 'fa fa-keyboard-o'),
                    validationMessage: $scope.validationMessage
                }

            }
        };
    });

});