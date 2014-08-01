

var Hapi        = require('hapi'),
    server      = new Hapi.Server(1337, 'localhost');


server.pack.register(
    [
        { plugin: require('ckProducts') },
        { plugin: require('good'), options: require('./logging-options') },
        { plugin: require('hapi-auth-cookie') }
    ],

    function(err) {
        if (err) throw err;

        // set up the server authentication strategy
        server.auth.strategy('session', 'cookie', {
            password: 'secret',
            cookie: 'sid-example',
            redirectTo: '/login',
            isSecure: false
        });

        // add client routes
        require('./static-routes-client')(server);

        // add api
        require('./api/validations.js')(server);
        require('./api/questions.js')(server);
        require('./api/translations.js')(server);
    }
);

server.start(function() {
    server.log(['log'], 'Hapi server started.');

    require('./initialize-database');
});

