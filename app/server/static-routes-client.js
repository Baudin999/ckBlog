
module.exports = function(server) {
    var authenticationService = require('./services/authenticationService');

    var modules = ['shared', 'subjects'];
    var getModuleRoutes = function(partName) {
        var result = modules.map(function(moduleName) {
            return './app/web-client/modules/' + moduleName + '/' + partName;
        });
        if (partName === 'directives') {
            result.push('./app/web-client/modules/shared/directives/formDirectives');
        }
        return result;
    };

    server.route([


        // app static files
        { method: 'GET', path: '/app/styles/{name}',  handler: { directory: { path: './app/web-client/styles' } } },
        { method: 'GET', path: '/app/components/{name}',  handler: { directory: { path: [
            './app/web-client/components',
            // we have to inject both these routes because of Windows/Linux file system differences
            '/app/web-client/components'
        ] } } },
        { method: 'GET', path: '/app/templates/{name}',  handler: { directory: { path: './app/web-client/modules/shared/directives/templates' } } },
        { method: 'GET', path: '/app/core/{name}',  handler: { directory: { path: './app/web-client/core' } } },
        { method: 'GET', path: '/app/images/{name}',  handler: { directory: { path: './app/web-client/images' } } },
        { method: 'GET', path: '/app/{name}',  handler: { directory: { path: './app/web-client' } } },

        { method: 'GET', path: '/app/controllers/{name}',  handler: { directory: { path: getModuleRoutes('controllers') } } },
        { method: 'GET', path: '/app/forms/{name}',  handler: { directory: { path: getModuleRoutes('formDefinitions') } } },
        { method: 'GET', path: '/app/views/{name}',  handler: { directory: { path: getModuleRoutes('views') } } },
        { method: 'GET', path: '/app/directives/{name}',  handler: { directory: { path: getModuleRoutes('directives')} } },
        { method: 'GET', path: '/app/services/{name}',  handler: { directory: { path: getModuleRoutes('services') } } },
        { method: 'GET', path: '/app/resources/{name}',  handler: { directory: { path: getModuleRoutes('resources') } } },
        { method: 'GET', path: '/app/models/{name}',  handler: { directory: { path: getModuleRoutes('models') } } },

        // load all of the static bower component routes
        { method: 'GET', path: '/src/{name}',  handler: { directory: { path: require('./static-routes-bower')} } },
        { method: 'GET', path: '/js/metro/{name}',  handler: { directory: { path: './bower_components/Metro-UI-CSS/js'} } },
        { method: 'GET', path: '/fonts/{name}',  handler: { directory: { path: [
            './bower_components/Metro-UI-CSS/fonts',
            './bower_components/fontawesome/fonts'
        ] } } },


        // load the static pages and login provider stuff
        { method: 'GET', path: '/login', handler: { file: './app/server/pages/login.html'  } },
        { method: 'POST', path: '/login', config: authenticationService.loginConfig },
        { method: 'GET', path: '/logout', config: authenticationService.logoutConfig },
        { method: 'GET', path: '/createAccount', handler: { file: './app/server/pages/createAccount.html'  } },
        { method: 'POST', path: '/createAccount', config: authenticationService.createAccountConfig },
        { method: 'GET', path: '/',
            config: {
                handler: { file: './app/server/pages/index.html'  },
                auth: 'session'
            }
        }
    ]);




};