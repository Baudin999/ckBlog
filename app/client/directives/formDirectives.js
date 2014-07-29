

define(['directives/ckInputM', 'directives/ckSelectM', 'directives/ckDateTimeM'], function(ckInputMFactory, ckSelectMFactory, ckDateTimeMFactory) {

    var module = angular.module('ckForms', []);

    // hook up the individual rendering templates
    ckInputMFactory(module);
    ckSelectMFactory(module);
    ckDateTimeMFactory(module);

});