
define(['services/baseService', 'app'], function(baseService) {

    function Subjects(futureSubjectsData) {
        if (!futureSubjectsData.then) {
            angular.extend(this, futureSubjectsData);
        }
        else {
            this.$unwrap(futureSubjectsData);
        }
    };

    Subjects.$factory = ['$timeout', '$resource', function($timeout, $resource) {
        angular.extend(Subjects, {
            $$resource: new $resource(
                '/subjects/:key',
                { key: '@key' }
            ),
            $timeout: $timeout
        });

        return Subjects;
    }];

    Subjects.$query = function() {
        var futureSubjectData = Subjects.$$resource.query().$promise;
        return new Subjects(futureSubjectData);
    };

    Subjects.prototype.$valid = function(data) {
        return true;
    };

    Subjects.prototype.$getTranslations = function(lang) {
        lang = lang || this.$rootScope.lang || 'en';
        return this.translations[lang];
    };

    Subjects.prototype.$unwrap = function(futureSubjectData) {
        var self = this

        this.$futureSubjectData = futureSubjectData;
        this.$futureSubjectData.then(function(data) {
            if (!self.$valid(data)) return new Error('Failed to unwrap the subject data');
            Subjects.$timeout(function() {
                angular.extend(self, data);
            });
        });
    };

    angular.module('app').service('subjectService', Subjects.$factory);
});



/*

 EXAMPLE SUBJECT

 {
     "_id": "56a15041-2120-11e4-9633-49889ed96e10",         //CouchDB property
     "_rev": "1-0763c0e7f58f62ebd55120bf294c16ef",          //CouchDB property
     "key": "math",                                         //System generated
     "entity": "subject"                                    //System generated
     "image": "mathematics_01.jpg",                         //Required
     "translations": {
         "nl": {
         "name": "Wiskunde",
         "description": "Wiskunde (minder gebruikelijk: mathematiek, mathematica of mathesis) is een..."
         },
         "en": {
         "name": "Mathematics",
         "description": "Mathematicians seek out patterns and use them to formulate new..."
         }
     },
     "name": "Mathematics",                                 //Required
     "description": "Mathematicians seek out patterns and use them to formulate new conjectures..."
 }

 */