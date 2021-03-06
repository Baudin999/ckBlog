﻿'use strict';

define([], function () {

    var services = angular.module('routeResolverServices', []);

    //Must be a provider since it will be injected into module.config()    
    services.provider('routeResolver', function () {

        this.$get = function () {
            return this;
        };

        this.routeConfig = function () {
            var viewsDirectory = '/app/views/',
                controllersDirectory = '/app/controllers/',
                setBaseDirectories = function (viewsDir, controllersDir) {
                    viewsDirectory = viewsDir;
                    controllersDirectory = controllersDir;
                },
                getViewsDirectory = function () {
                    return viewsDirectory;
                },
                getControllersDirectory = function () {
                    return controllersDirectory;
                };

            return {
                setBaseDirectories: setBaseDirectories,
                getControllersDirectory: getControllersDirectory,
                getViewsDirectory: getViewsDirectory
            };
        }();

        this.route = function (routeConfig) {

            var resolve = function (baseName, options) {
                var routeDef = {},
                    _options = options || {};

                Object.keys(_options).map(function (key) {
                    routeDef[key] = _options[key];
                });

                // this is the mobile convention
                routeDef.isMobile = routeDef.isMobile || false;
                routeDef.templateUrl = _options.templateUrl || routeConfig.getViewsDirectory() + baseName + '.html';
                routeDef.controller = baseName + 'Controller';
                routeDef.reloadOnSearch = false;

                routeDef.resolve = {
                    load: ['$q', '$rootScope', function ($q, $rootScope) {
                        var dependencies = [routeConfig.getControllersDirectory() + baseName + 'Controller.js'];
                        return resolveDependencies($q, $rootScope, dependencies);
                    }]
                };

                return routeDef;
            },

            resolveDependencies = function ($q, $rootScope, dependencies) {
                var defer = $q.defer();
                require(dependencies, function () {
                    defer.resolve();
                    $rootScope.$apply();
                });
                return defer.promise;
            };

            return {
                resolve: resolve
            };
        }(this.routeConfig);
    });

    

});