

define(['app', 'forms/subjectCreateDefinition', 'forms/translationModelDefinition'],
    function(app, subjectCreateDefinition, translationModelDefinition){


    var controller = function($rootScope, $scope, $location, translationService, toolbarService, menuService) {
        $scope.title = 'title';
        $scope.navigate = function(path) {
           $location.path(path);
        };
        $scope.model = {
            translations: { }
        };

        ['en', 'nl'].map(function(lang) {
            $scope.model.translations[lang] = {
                name: '({0}: Name)'.format(lang),
                description: '({0}: Description)'.format(lang)
            };
        });

        $scope.handlers = {
            saveHandler: function() {
                $scope.navigate('/subject');
            },
            selectTranslation: function(translation) {
                if ($scope.$selectedTranslation === translation) {
                    delete $scope.$selectedTranslation;
                }
                else {
                    $scope.$selectedTranslation = translation;
                }
            },
            break: function() {
                debugger;
            }
        };

        $scope.formModel = subjectCreateDefinition($scope);
        $scope.translationModel = translationModelDefinition($scope);

        translationService.get('subjectCreate').then(function(translations) {
            $rootScope.translations = translations;
        });

        menuService.createBreadcrumbTrail([
            { title: 'subjects', url: '#/subject', cssClass: 'fa fa-cubes', translations: { en: 'Subjects', nl: 'Onderwerpen' } },
            { title: 'createSubject', url: '#/subject/create', cssClass: 'fa fa-cube', translations: { en: 'Create new subject', nl: 'Nieuw onderwerp' } }
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