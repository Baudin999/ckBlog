

define(['app'], function(app){
    var controller = function(
        $rootScope, $scope, $http, $location, $routeParams, Restangular,
        translationService, toolbarService, menuService, SubjectResource, QuestionResource) {

        $scope.title = 'subjectDetailsController';
        $scope.key = $routeParams.key;
        $scope.navigate = function(path) {
           $location.path(path);
        };
        $scope.handlers = {
            save: function() {
                $scope.navigate('/subject/create');
            }
        };

        SubjectResource.get({ key: $scope.key }, function(subject) {
            $scope.subject = subject;

        //            $scope.subject.questions(function(questions, subject) {
        //                $scope.questions = subject.$questions;
        //            });
            $scope.subject.questions().then(function(questions) {
                $scope.questions = $scope.subject.$questions;

                setTimeout(function() {
                    var question = new $scope.subject.$Question({
                        name: 'Carlos', description: 'Peter Pan'
                    });
                    $scope.subject.$questions.push(question);
                    $scope.subject.$save();

                    question.$save();
                }, 1000);
            });

            (function(translationsObject) {
                currentMenuItem.title = translationsObject.name;
                $scope.title = translationsObject.name;
                $scope.description = translationsObject.description;
            })($scope.subject.getTranslations());
        });

        translationService.get('subjectDetails').then(function(translations) {
            $rootScope.translations = translations;
        });

        var currentMenuItem = {
            title: 'subjectDetails',
            url: '#/subject/details/' + $scope.key,
            cssClass: 'fa fa-cubes',
            translate: false
        };
        menuService.createBreadcrumbTrail([
            { title: 'subjects', url: '#/subject', cssClass: 'fa fa-cubes', translate: true },
            currentMenuItem
        ]);

        toolbarService.createToolbar([
            { title: 'Save', cssClass:'fa fa-plus', type: 'button', handler: $scope.save, keyCode: 'alt-s' }
        ]);
    };

    app.register.controller('subjectDetailsController', [
        '$rootScope', '$scope', '$http', '$location', '$routeParams', 'Restangular',
        'translationService', 'toolbarService', 'menuService', 'subjectService', 'questionService',
        controller
    ]);
});
