/**
 * Created by ckelkboom on 11-8-14.
 */



define(['app'], function(app) {
    app.factory('questionService', function($rootScope, $resource) {
        var questionsResource = $resource('/questions/:id', { id: '@id' });



        return questionsResource;
    });
});

