

define(['app'], function(app){
    var controller = function($rootScope, $scope, $location, $routeParams, translationService, toolbarService, menuService) {
        $scope.title = 'subjectDetailsController';
        $scope.key = $routeParams.key;
        $scope.navigate = function(path) {
           $location.path(path);
        };
        $scope.handlers = {
            addSubjectHandler: function() {
                $scope.navigate('/subject/create');
            }
        };

        translationService.get('subjectDetails').then(function(translations) {
            $rootScope.translations = translations;
        });

        menuService.createBreadcrumbTrail([
            { title: 'subjects', url: '#/subject', cssClass: 'fa fa-cubes' },
            { title: 'subjectDetails', url: '#/subject/details/' + $scope.key, cssClass: 'fa fa-cubes' }
        ]);

        toolbarService.createToolbar([
            //{ title: 'Add', cssClass:'fa fa-plus', type: 'button', handler: $scope.handlers.addsubjectDetailsControllerHandler, keyCode: 'ins' }
        ]);
    };

    app.register.controller('subjectDetailsController', [
        '$rootScope', '$scope', '$location', '$routeParams',
        'translationService', 'toolbarService', 'menuService',
        controller
    ]);
});
