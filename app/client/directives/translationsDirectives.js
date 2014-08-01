

define([], function() {

    var module = angular.module('ckTranslations', []);

    module.directive('translate', function() {
        return {
            restrict: 'A',
            controller: function($scope, $rootScope, $element, $interpolate) {

                var translationKey = $element.attr('translate');
                if (!translationKey) translationKey = $element[0].innerHTML;
                if (!translationKey)
                    throw 'Please provide a translation key, ' +
                          'either as innerHTML or as value of the translate attribute.';

                 var regex = /(.*?){{(.*?)}}(.*?)/;

                if (translationKey.match(regex)) {
                    var exp = $interpolate(translationKey);
                    translationKey = exp($scope);
                }

                $scope.$watch('translations', function(n, o) {
                    if (!n) return;

                    var _value = '<i class="fa fa-exclamation-circle"></i>t:' + translationKey;
                    if (translationKey in $scope.translations &&
                        $rootScope.lang in $scope.translations[translationKey]) {

                        _value = $scope.translations[translationKey][$rootScope.lang]
                    }
                    $element[0].innerHTML = _value;
                });

            }
        };
    });


});
