

define([], function() {

    var module = angular.module('ckTranslations', []);

    module.directive('translate', function() {
        return {
            restrict: 'A',
            controller: function($scope, $element) {

                var translationKey = $element.attr('translate');
                if (!translationKey) translationKey = $element[0].innerHTML;
                if (!translationKey)
                    throw 'Please provide a translation key, ' +
                          'either as innerHTML or as value of the translate attribute.';


                $scope.$watch('translations', function(n, o) {
                    if (!n) return;
                    $element[0].innerHTML = $scope.translations[translationKey].nl;
                });

            }
        };
    });


});
