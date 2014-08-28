

define(
    ['directives/ckInputM', 'directives/ckMultilineM', 'directives/ckSelectM', 'directives/ckDateTimeM'],
    function(ckInputMFactory, ckMultilineMFactory, ckSelectMFactory, ckDateTimeMFactory) {

    var module = angular.module('ckForms', []);

    // hook up the individual rendering templates
    ckInputMFactory(module);
    ckMultilineMFactory(module);
    ckSelectMFactory(module);
    ckDateTimeMFactory(module);

});