

define([], function() {


    var factory = function(module) {

        /**
         * description:
         * TextBox directive. This directives give the power to inject an
         * input of type text with labels, validation and other playthings
         * into a form.
         *
         * usage:
         * <ck-text-m title="First name" data-ng-model="myModel.firstName"></ck-text-m>
         *
         * attributes:
         *  cssClass:           (changed the icon in the right icon block)
         *  title:              The value of the label
         *  validationMessage:  The message when the text field does not validate
         */
        module.directive('ckInputM', function() {

            var getTranslation = function(key) {
                return key;
            };

            return {
                restrict: 'E',
                templateUrl: '/app/templates/ck-input-m.html',
                scope: {
                    cssClass: '@',
                    title: '@',
                    type: '@',
                    inputType: '@',
                    validationMessage: '@message',
                    valueChangedHandler: '=?',
                    validate: '=?validationHandler',
                    data: '=ngModel',
                    source: '=?',

                    exact: '@',
                    max: '@',
                    min: '@',

                    allowClear: '@',
                    allowValueChanged: '@',
                    allowValidate: '@',

                    options: '=?'
                },
                controller: function($scope, $log) {

                    if (!$scope.source && $scope.options && $scope.options.source) $scope.source = $scope.options.source;

                    var mergedOptions = $scope.options || {};
                    mergedOptions.title = $scope.title || mergedOptions.title || 'Field';
                    mergedOptions.name = $scope.name || mergedOptions.name || 'Unknown';
                    mergedOptions.validationMessage = $scope.validationMessage || mergedOptions.validationMessage;
                    mergedOptions.validationClass = $scope.type || mergedOptions.type || '';
                    mergedOptions.cssClass = $scope.cssClass || mergedOptions.cssClass || 'fa fa-keyboard-o';
                    mergedOptions.isValid = true;

                    // input type
                    mergedOptions.inputType = $scope.inputType || mergedOptions.inputType || 'text';

                    // length validation
                    mergedOptions.min = eval($scope.min || mergedOptions.min || -1);
                    mergedOptions.max = eval($scope.max || mergedOptions.max || -1);
                    mergedOptions.exact = eval($scope.exact || mergedOptions.exact || -1);

                    // handlers
                    mergedOptions.valueChangedHandler = $scope.valueChangedHandler || mergedOptions.valueChangedHandler;
                    mergedOptions.validate = $scope.validate || mergedOptions.validationHandler;

                    // flags
                    mergedOptions.allowClear = eval($scope.allowClear || mergedOptions.allowClear || true);
                    mergedOptions.allowValueChanged = eval($scope.allowValueChanged || mergedOptions.allowValueChanged || !!mergedOptions.valueChangedHandler);
                    mergedOptions.allowValidate = eval($scope.allowValidate || mergedOptions.allowValidate || !!mergedOptions.validate);

                    $scope.options = mergedOptions;

                    $scope.reset = function() {
                        if ($scope.options.allowClear) {
                            $scope.data = '';
                            $scope.valueChanged();
                        }
                    };

                    $scope.valueChanged = function() {

                        var isValid = true,
                            isMinValid = true,
                            isMaxValid = true,
                            isExactValid = true,
                            hasValidation = false;

                        if ($scope.options.allowValueChanged &&
                            $scope.options.valueChangedHandler &&
                            typeof $scope.options.valueChangedHandler === 'function') {

                            // fire the value changed event if and only if this event is attached.
                            $scope.options.valueChangedHandler($scope.data, $scope.source);
                            hasValidation = true;
                        }

                        if ($scope.options.allowValidate &&
                            $scope.options.validate &&
                            typeof $scope.options.validate  === 'function') {

                            // fire the custom validate function
                            isValid = $scope.options.validate($scope.data, $scope.options);
                            hasValidation = true;
                        }

                        if ($scope.options.min > -1 && $scope.data) {
                            isMinValid = $scope.data.length >= $scope.options.min;
                            hasValidation = true;
                        }
                        if ($scope.options.max > -1 && $scope.data) {
                            isMaxValid = $scope.data.length <= $scope.options.max;
                            hasValidation = true;
                        }
                        if ($scope.options.exact > -1 && $scope.data) {
                            isExactValid = $scope.data.length == $scope.options.exact;
                            hasValidation = true;
                        }

                        if (hasValidation) {
                            $scope.options.isValid = isValid && isMinValid && isMaxValid && isExactValid;
                            $scope.options.validationClass = $scope.options.isValid ? 'valid' : 'invalid';
                        }
                    };

                    if ($scope.source) {
                        $scope.$watch('source', function(n, o) {
                            if (angular.equals(n,o)) return;
                            $scope.valueChanged();
                        }, true);
                    }
                }
            };
        });
    };

    return factory;

});