

define([], function(){
    var controller = function($rootScope, $scope, $location, $resource, $http,
                              translationService, toolbarService, menuService, Subjects) {

        $scope.title = 'subjectController';
        $scope.navigate = function(path) {
           $location.path(path);
        };
        $scope.navigateDetails = function(key) {
            $location.path('/subject/details/' + key);
        };
        $scope.handlers = {
            addSubjectHandler: function() {
                $location.path('/subject/create');
            }
        };

        $scope.subjects = Subjects.$query();

        translationService.get('subject').then(function(translations) {
            $rootScope.translations = translations;
        });

        menuService.createBreadcrumbTrail([
            { title: 'Subjects', url: '#/subject', cssClass: 'fa fa-cubes' }
        ]);

        toolbarService.createToolbar([
            { title: 'Add', cssClass:'fa fa-plus', type: 'button', handler: $scope.handlers.addSubjectHandler, keyCode: 'ins' }
        ]);
    };

    controller.$inject = ['$rootScope', '$scope', '$location', '$resource', '$http',
        'translationService', 'toolbarService', 'menuService', 'subjectService'];

    angular.module('app').register.controller('subjectController', controller);
});
