'use strict';

define([], function () {

    var module = angular.module('ckServiceResolver', []);

    module.provider('ckServiceResolver', function() {

        this.$get = function(name) {
            return this;
        };

        this.factory = function(name, delegate) {
            debugger;
        };

    });

    module.provider('ckResourceResolver', function() {

        this.$get = function(name, delegate) {

            debugger;

        };

    });





    return module;

});