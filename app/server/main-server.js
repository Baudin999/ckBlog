

var Hapi        = require('hapi'),
    server      = new Hapi.Server(1337, 'localhost'),
    SocketIO    = require('socket.io');


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
        require('./api/subjects.js')(server);
        require('./api/questions.js')(server);
        require('./api/translations.js')(server);
    }
);



server.start(function() {
    // Initialize the database
    require('./initialize-database')(false);

    // initialize Socket.IO
    var io = SocketIO.listen(server.listener);
    io.sockets.on('connection', function(socket) {
        socket.emit({msg: 'welcome'});
    });

    // broadcast that the server has started
    server.log(['log'], 'Hapi server started.');
});



