

define(['app'], function(app){
    var controller = function($rootScope, $scope, $location, translationService, toolbarService, menuService) {
        $scope.title = 'title';
        $scope.navigate = function(path) {
           $location.path(path);
        };
        $scope.handlers = {
            saveHandler: function() {
                $scope.navigate('/subject');
            }
        };

        translationService.get('subjectCreate').then(function(translations) {
            $rootScope.translations = translations;
        });

        menuService.createBreadcrumbTrail([
            { title: 'subjects', url: '#/subject', cssClass: 'fa fa-cubes' },
            { title: 'createSubject', url: '#/subject/create', cssClass: 'fa fa-cube' }
        ]);

        toolbarService.createToolbar([
            { title: 'Save', cssClass:'fa fa-plus', type: 'button', handler: $scope.handlers.saveHandler, keyCode: 'alt-s' }
        ]);
    };

    app.register.controller('subjectCreateController', [
        '$rootScope', '$scope', '$location',
        'translationService', 'toolbarService', 'menuService',
        controller
    ]);
});
