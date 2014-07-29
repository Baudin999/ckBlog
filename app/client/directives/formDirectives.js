

define(['directives/ckTextM', 'directives/ckSelectM', 'directives/ckDateTimeM'], function(ckTextMFactory, ckSelectMFactory, ckDateTimeMFactory) {

    var module = angular.module('ckForms', []);

    // hook up the individual rendering templates
    ckTextMFactory(module);
    ckSelectMFactory(module);
    ckDateTimeMFactory(module);

});