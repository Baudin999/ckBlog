

define(['directives/ckTextM', 'directives/ckSelectM'], function(ckTextMFactory, ckSelectMFactory) {

    var module = angular.module('ckForms', []);

    // hook up the individual rendering templates
    ckTextMFactory(module);
    ckSelectMFactory(module);

});