

// define an empty controller
define(['app'], function(app) {

    // empty controller
    var controller = function($scope, $location, $log, menuService, toolbarService) {
        $scope.title = 'Create new category';
        $scope.saveCategory = function() {
            $log.debug('Saving the new category.');
            $location.path('/categories');
        };

        $scope.lists = {
            genders: [ 'Male', 'Female' ],
                salutations: [
                { name: 'Mister', code: 'mr.' },
                { name: 'Misses', code: 'ms.' }
            ],
                hobbies: [
                { id: 1, name: 'Cycling' },
                { id: 2, name: 'Boxing' },
                { id: 3, name: 'Rowing' },
                { id: 4, name: 'Darts' }
            ]
        };
        $scope.model = { };
        $scope.break = function() {
            var model = this.model;
            $log.debug(model);
            debugger;
        };

        $scope.handlers = {
            firstNameChangedHandler: function(firstName) {
                // $log.debug(firstName);
            },
            firstNameValidationHandler: function(firstName) {
                return firstName[0] === 'C';
            },
            hobbyChangedHandler: function(hobby) {
                $scope.model.hobby = hobby;
            }
        };


        $scope.formOptions = {
            lastName: {
                title: 'Last name',
                required: true,
                cssClass: 'fa fa-soundcloud',
                min: 2,
                source: $scope.model,
                validationMessage: 'Something fishy',
                valueChangedHandler: function(lastName) {
                    // $log.info(lastName);
                },
                validationHandler: function(lastName, options) {

                    if (lastName === 'Kelkboom' && $scope.model.firstName === 'Carlos') return true;

                    if (lastName === 'Taal') {
                        options.validationMessage = 'Taal doet niet meer mee!';
                        return false;
                    }
                    if (lastName !== 'Kelkboom') {
                        options.validationMessage = 'Achternaam moet Kelkboom zijn';
                        return false;
                    }
                    if (lastName === 'Kelkboom' && $scope.model.firstName !== 'Carlos') {
                        options.validationMessage = 'Achternaam moet Kelkboom zijn en voornaam moet Carlos zijn.';
                        return false;
                    }
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