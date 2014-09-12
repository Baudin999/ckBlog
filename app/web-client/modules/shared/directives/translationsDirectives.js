
define([], function() {

    var tranlationModule = angular.module('ckTranslations', []);

    tranlationModule.directive('translate', function() {
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

                $scope.$watch('$root.translations', function(n, o) {
                    if (!n) return;

                    var _value = $element[0].innerHTML || '<i class="fa fa-exclamation-circle"></i>t:' + translationKey;
                    if (translationKey in $scope.$root.translations &&
                        $rootScope.lang in $scope.$root.translations[translationKey]) {

                        _value = $scope.$root.translations[translationKey][$rootScope.lang]
                    }
                    $element[0].innerHTML = _value;
                });

            }
        };
    });

    return tranlationModule;
});
