
module.exports = function(server) {
    var authenticationService = require('./services/authenticationService');
    server.route([


        // app static files
        { method: 'GET', path: '/app/styles/{name}',  handler: { directory: { path: './app/web-client/styles' } } },
        { method: 'GET', path: '/app/components/{name}',  handler: { directory: { path: [
            './app/web-client/components',
            // we have to inject both these routes because of Windows/Linux file system differences
            '/app/web-client/components'
        ] } } },
        { method: 'GET', path: '/app/controllers/{name}',  handler: { directory: { path: './app/web-client/controllers' } } },
        { method: 'GET', path: '/app/forms/{name}',  handler: { directory: { path: './app/web-client/formDefinitions' } } },
        { method: 'GET', path: '/app/views/{name}',  handler: { directory: { path: './app/web-client/views' } } },
        { method: 'GET', path: '/app/directives/{name}',  handler: { directory: { path: [
            './app/web-client/directives',
            './app/web-client/directives/formDirectives'
        ] } } },
        { method: 'GET', path: '/app/services/{name}',  handler: { directory: { path: './app/web-client/services' } } },
        { method: 'GET', path: '/app/templates/{name}',  handler: { directory: { path: './app/web-client/directives/templates' } } },
        { method: 'GET', path: '/app/core/{name}',  handler: { directory: { path: './app/web-client/core' } } },
        { method: 'GET', path: '/app/images/{name}',  handler: { directory: { path: './app/web-client/images' } } },
        { method: 'GET', path: '/app/{name}',  handler: { directory: { path: './app/web-client' } } },

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