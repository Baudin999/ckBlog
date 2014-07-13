

define(['directives/ckTextM'], function(ckTextMFactory) {

    var module = angular.module('ckForms', []);

    // hook up the individual rendering templates
    ckTextMFactory(module);

});