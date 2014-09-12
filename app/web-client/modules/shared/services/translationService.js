/**
 * Created by ckelkboom on 9-7-14.
 *
 * This service is used to the get the translations either from the server or from the local-storage
 * when the translations are cached there.
 *
 *
 */


define(['app'], function(app) {


    app.service('translationService', function($rootScope, $http, $q, $localStorage) {

        this.get = function(page) {

            var storageTitle = 'translations-{0}'.format(page),
                deferred = $q.defer();

            if (!$rootScope.isDebug && $localStorage[storageTitle]) {
                deferred.resolve($localStorage[storageTitle]);
            }
            else {
                var postFix = (Math.random() * Math.pow(10, 13)).toFixed(0);
                $http.get('/translations/{0}?index={1}'.format(page, postFix)).success(function(translations) {
                    $localStorage[storageTitle] = translations;
                    deferred.resolve(translations);
                });
            }

            return deferred.promise;
        };

    });

});