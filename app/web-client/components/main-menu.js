

define(['app'], function(app) {

    // the main menu controller
    app.register.controller('main-menu', function($rootScope, $scope, $timeout) {

        $scope.title = 'Quizzer';
        $scope.breadcrumbs = [
            { title: 'Home', url: '#/home', cssClass: 'icon-home' }
        ];
        $scope.toolbarItems = [];
        $scope.language = $rootScope.lang;
        $scope.quickLinks = [
            { title: 'Home', url: '#/home', cssClass: 'icon-home' },
            { title: 'Dashboard', url: '#/dashboard', cssClass: 'icon-dashboard' }
        ];
        $scope.profile = {
            name: 'Carlos Kelkboom'
        };
        $scope.switchLanguage = function(lang) {
            $rootScope.lang = lang;
        };
        $scope.searchPlaceholder = { en: 'Search...', nl: 'Zoeken...' };


        $scope.$on('breadcrumbChanged', function(event, breadcrumbs) {
            breadcrumbs.map(function(breadcrumb) {
                if (typeof breadcrumb.translate === 'undefined')
                    breadcrumb.translate = true;

                if (!breadcrumb.translations) {
                    breadcrumb.translations = {
                        en: breadcrumb.title,
                        nl: breadcrumb.title
                    };
                }

                $scope.breadcrumbs.push(breadcrumb);
            });
        });

        $scope.$on('toolbarChanged', function(event, toolbarItems) {
            $scope.toolbarItems = toolbarItems;
        });

        $scope.$on('$routeChangeStart', function(next, current) {
            $scope.breadcrumbs.splice(1, $scope.breadcrumbs.length - 1);
            $scope.toolbarItems = [];
        });
    });

});