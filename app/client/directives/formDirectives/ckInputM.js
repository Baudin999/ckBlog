

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

            var getTranslation = function(key) { return key; },
                form,
                setForm = function(scope) {
                    var currentScope = scope;
                    form = scope.form;

                    while(!form) {
                        currentScope = currentScope.$parent;
                        if (!currentScope) break;
                        form = currentScope.form;
                    }

                    if (form && !form.fieldOptions) {
                        form.fieldOptions = [];
                        Object.defineProperty(form.fieldOptions, 'isValid', {
                            enumerable: false,
                            get: function() {
                                return form.fieldOptions.filter(function(fo) {
                                    return !fo.isValid;
                                }).length == 0;
                            }
                        });
                    }
                };


            return {
                restrict: 'E',
                templateUrl: '/app/templates/ck-input-m.html',
                scope: {
                    cssClass: '@',
                    name: '@',
                    title: '@',
                    type: '@',
                    translationKey: '@',
                    inputType: '@',
                    validationMessage: '@message',
                    valueChangedHandler: '=?',
                    validate: '=?validationHandler',
                    data: '=ngModel',
                    source: '=?',

                    required: '@',
                    exact: '@',
                    max: '@',
                    min: '@',

                    allowClear: '@',
                    allowValueChanged: '@',
                    allowValidate: '@',

                    options: '=?'
                },
                controller: function($rootScope, $scope, $element) {

                    setForm($scope);

                    if (!$scope.source && $scope.options && $scope.options.source) $scope.source = $scope.options.source;

                    var mergedOptions = $scope.options || {};
                    mergedOptions.title = $scope.title || mergedOptions.title || 'Field';
                    mergedOptions.translationKey = $scope.translationKey || mergedOptions.translationKey;
                    mergedOptions.name = $scope.name || mergedOptions.name;
                    mergedOptions.validationMessage = $scope.validationMessage || mergedOptions.validationMessage;
                    mergedOptions.validationClass = $scope.type || mergedOptions.type || '';
                    mergedOptions.cssClass = $scope.cssClass || mergedOptions.cssClass || 'fa fa-keyboard-o';
                    mergedOptions.isValid = true;

                    // input type
                    mergedOptions.inputType = $scope.inputType || mergedOptions.inputType || 'text';

                    // length validation
                    mergedOptions.required = $scope.required || mergedOptions.required || false;
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

                    if (form) {
                        form.fieldOptions.push(mergedOptions);
                    }

                    $scope.options = mergedOptions;
                    $scope.options.setIsValid = function(isValid, message) {
                        $scope.options.isValid = isValid;
                        $scope.options.validationClass = $scope.options.isValid ? 'valid' : 'invalid';

                        if (!$scope.options.isValid) {
                            $scope.options.validationMessage = message || $scope.options.validationMessage;
                        } else {
                            $scope.options.validationMessage = '';
                        }
                    };

                    $scope.$watch('options.isValid', function(n, o) {
                        if ($scope.data && n !== o && form) {
                            form[$scope.options.name].$setValidity($scope.options.validationMessage, n);
                            if (n) $scope.options.validationMessage = '';
                        }
                    });

                    $scope.reset = function() {
                        if ($scope.options.allowClear) {
                            $scope.data = '';
                            $scope.valueChanged();
                        }
                    };

                    $scope.valueChanged = function() {

                        var isValid = true,
                            isRequiredValid = true,
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

                        if (typeof $scope.data !== 'undefined') {
                            if ($scope.options.min > -1) {
                                isMinValid = $scope.data.length >= $scope.options.min;
                                hasValidation = true;
                            }
                            if ($scope.options.max > -1) {
                                isMaxValid = $scope.data.length <= $scope.options.max;
                                hasValidation = true;
                            }
                            if ($scope.options.exact > -1) {
                                isExactValid = $scope.data.length == $scope.options.exact;
                                hasValidation = true;
                            }
                        }
                        if ($scope.options.required) {
                            isRequiredValid =  !!$scope.data;
                            if (!isRequiredValid) $scope.options.validationMessage =
                                '{0} is required.'.format($scope.options.title);
                            hasValidation = true;
                        }

                        if (hasValidation) {
                            $scope.options.isValid = isValid && isRequiredValid && isMinValid && isMaxValid && isExactValid;
                            $scope.options.validationClass = $scope.options.isValid ? 'valid' : 'invalid';
                        }
                    };

                    if ($scope.source) {
                        $scope.$watch('source', function(n, o) {
                            if (angular.equals(n,o)) return;
                            $scope.valueChanged();
                        }, true);
                    }

                    setTimeout(function() {
                        $element.delegate('input', 'focus', function() {
                            $(this).find('.input-control').toggleClass("focus");
                            $rootScope.$broadcast('form-field-focus', $scope.options);
                        });
                        $element.delegate('input', 'blur', function() {
                            $(this).find('.input-control').toggleClass("focus");
                            $rootScope.$broadcast('form-field-blur', $scope.options);
                        });
                    }, 0);
                }
            };
        });
    };

    return factory;

});