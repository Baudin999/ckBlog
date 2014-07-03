

var Hapi        = require('hapi'),
    ckProducts  = require('ckProducts'),
    server      = new Hapi.Server(1337, 'localhost');


var options = {
    subscribers: {
        'console':                      { events: ['log', 'error'] },
        './app/server/logs/requests/':  { events: ['request'] },
        './app/server/logs/errors/':    { events: ['error'] }
    }
};

server.route({
    method: 'GET',
    path: '/',
    handler: function(req, reply) {
        reply('root');
    }
});

server.pack.register(

    [
        { plugin: ckProducts },
        { plugin: require('good'), options: options }
    ],

    function(err) {
        if (err) throw err;
        server.start(function() {
            server.log(['log'], 'Hapi server started.');
        });
    }
);

