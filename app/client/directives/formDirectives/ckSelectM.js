

define([], function() {


    var factory = function(module) {

        /**
         * description:
         * Select List directive. This directives give the power to inject an
         * input of type select with labels, validation and other playthings
         * into a form.
         *
         * usage:
         * <ck-select-m title="Gender" data-ng-model="myModel.firstName"></ck-select-m>
         *
         * attributes:
         *  cssClass:           (changed the icon in the right icon block)
         *  title:              The value of the label
         *  validationMessage:  The message when the text field does not validate
         */
        module.directive('ckSelectM', function() {

            var getTranslation = function(key) {
                return key;
            };

            return {
                restrict: 'E',
                templateUrl: '/app/templates/ck-select-m.html',
                scope: {
                    cssClass: '@',
                    title: '@',
                    type: '@',
                    validationMessage: '@message',
                    valueChangedHandler: '=?',
                    validate: '=?validationHandler',
                    data: '=ngModel',

                    allowClear: '@',
                    allowValueChanged: '@',
                    allowValidate: '@',

                    list: '=',
                    listKey: '@',
                    listValue: '@',

                    options: '=?'
                },
                controller: function($scope) {
                    var mergedOptions = $scope.options || {};
                    mergedOptions.title = $scope.title || mergedOptions.title || 'Field';
                    mergedOptions.name = $scope.name || mergedOptions.name || 'Unknown';
                    mergedOptions.validationMessage = $scope.validationMessage || mergedOptions.validationMessage;
                    mergedOptions.validationClass = $scope.type || mergedOptions.type || '';
                    mergedOptions.cssClass = $scope.cssClass || mergedOptions.cssClass || 'fa fa-keyboard-o';
                    mergedOptions.isValid = true;

                    // select list options
                    mergedOptions.list = $scope.$eval(JSON.stringify($scope.list || mergedOptions.list || []));
                    mergedOptions.key = $scope.listKey || mergedOptions.listKey;
                    mergedOptions.value = $scope.listValue || mergedOptions.listValue;

                    if (!mergedOptions.key && !mergedOptions.value) mergedOptions.listType = 'simple';
                    if (mergedOptions.key && mergedOptions.value) mergedOptions.listType = 'complex';


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

                        if ($scope.options.allowValueChanged &&
                            $scope.options.valueChangedHandler &&
                            typeof $scope.options.valueChangedHandler === 'function') {

                            // fire the value changed event if and only if this event is attached.
                            $scope.options.valueChangedHandler($scope.data);
                        }
                    };
                }
            };
        });
    };

    return factory;

});