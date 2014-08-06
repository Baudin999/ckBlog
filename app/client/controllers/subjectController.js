

define(['app'], function(app){
    var controller = function($rootScope, $scope, $location, $http, translationService, toolbarService, menuService) {

        $scope.title = 'subjectController';
        $scope.navigate = function(path) {
           $location.path(path);
        };
        $scope.handlers = {
            addSubjectHandler: function() {
                $location.path('/subject/create');
            }
        };

        $http.get('/subjects').then(function(result) {
            $scope.subjects = result.data;
        });

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

    app.register.controller('subjectController', ['$rootScope', '$scope', '$location', '$http', 'translationService', 'toolbarService', 'menuService', controller]);
});
