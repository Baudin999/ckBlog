/**
 * Created by ckelkboom on 27-8-14.
 */


define(function() {

    var baseObject = function() { };

    baseObject.prototype.$valid = function(data) {
        return true;
    };

    return new baseObject();

});