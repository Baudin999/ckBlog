/**
 * Created by ckelkboom on 9-7-14.
 *
 * This service is used to the get the translations either from the server or from the local-storage
 * when the translations are cached there.
 *
 *
 */


define(['app'], function(app) {


    app.service('translationService', function($http, $q, $localStorage) {

        this.get = function(page) {

            var storageTitle = 'translations-{0}'.format(page),
                deferred = $q.defer();

            if ($localStorage[storageTitle]) {
                deferred.resolve($localStorage[storageTitle]);
            }
            else {
                $http.get('/translations/{0}'.format(page)).success(function(translations) {
                    $localStorage[storageTitle] = translations;
                    deferred.resolve(translations);
                });
            }

            return deferred.promise;
        };

    });

});