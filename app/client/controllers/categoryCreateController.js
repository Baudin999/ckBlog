

// define an empty controller
define(['app'], function(app) {

    // empty controller
    var controller = function($scope, $location, $log, menuService, toolbarService) {
        $scope.title = 'Create new category';
        $scope.saveCategory = function() {
            $log.debug('Saving the new category.');
            $location.path('/categories');
        };

        $scope.model = {
            options: {
                genders: [ 'Male', 'Female' ],
                salutations: [
                    { name: 'Mister', code: 'mr.' },
                    { name: 'Misses', code: 'ms.' }
                ]
            }
        };
        $scope.break = function() {
            var foo = this.model.firstName;
            debugger;
        };

        $scope.handlers = {
            firstNameChangedHandler: function(firstName) {
                $log.debug(firstName);
            },
            firstNameValidationHandler: function(firstName) {
                return firstName[0] === 'C';
            }
        };


        $scope.formOptions = {
            lastName: {
                title: 'Last name',
                required: true,
                cssClass: 'fa fa-soundcloud',
                min: 2,
                validationMessage: 'Something fishy',
                valueChangedHandler: function(lastName) {
                    console.log(lastName);
                },
                validationHandler: function(lastName) {
                    return true;
                }
            }
        };

        menuService.createBreadcrumbTrail([
            { title: 'Categories', url: '#/categories', cssClass: 'fa fa-cubes' },
            { title: 'Create a new category', url: '#/categories/create', cssClass: 'fa fa-cube' }
        ]);

        toolbarService.createToolbar([
            { title: 'Save', cssClass:'fa fa-save', type: 'button', handler: $scope.saveCategory, keyCode: 'alt-s' }
        ]);
    };

    app.register.controller('categoryCreateController', [ '$scope', '$location', '$log', 'menuService', 'toolbarService', controller]);

});