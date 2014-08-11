

define(['app'], function(app){
    var controller = function($rootScope, $scope, $http, $location, $routeParams, translationService, toolbarService, menuService) {
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
        $http.get('/subjects/' + $scope.key).then(function(response) {
            $scope.subject = response.data;

            (function(translationsObject) {
                currentMenuItem.title = translationsObject.name;
                $scope.title = translationsObject.name;
                $scope.description = translationsObject.description;
            })($scope.subject.translations[$rootScope.lang]);
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
            //{ title: 'Add', cssClass:'fa fa-plus', type: 'button', handler: $scope.handlers.addsubjectDetailsControllerHandler, keyCode: 'ins' }
        ]);
    };

    app.register.controller('subjectDetailsController', [
        '$rootScope', '$scope', '$http', '$location', '$routeParams',
        'translationService', 'toolbarService', 'menuService',
        controller
    ]);
});
