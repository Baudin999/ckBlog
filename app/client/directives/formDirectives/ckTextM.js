

define([], function() {


    var factory = function(module) {

        /**
         * TextBox directive. This directives give the power to inject an
         * input of type text with labels, validation and other playthings
         * into a form.
         *
         * usage:
         * <ck-text-m title="First name" data-ng-model="myModel.firstName"></ck-text-m>
         *
         * attributes:
         *  cssClass    (changed the icon in the right icon block)
         *  title:      The value of the label
         */
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
                    validationMessage: '@message',
                    data: '=ngModel'
                },
                controller: function($scope) {

                    $scope.options = {
                        title: getTranslation($scope.title ? $scope.title : 'Field'),
                        name: ($scope.name ? $scope.name : 'Unknown'),
                        cssClass: ($scope.cssClass ? $scope.cssClass : 'fa fa-keyboard-o'),
                        validationMessage: $scope.validationMessage
                    }

                    $scope.valueChanged = function() {
                    };

                    $scope.reset = function() {
                        $scope.data = '';
                    }


                }
            };
        });
    };

    return factory;

});