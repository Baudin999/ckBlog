

var Hapi        = require('hapi'),
    server      = new Hapi.Server(1337, 'localhost');


var options = {
    subscribers: {
        'console':                      { events: ['log', 'error'] }//,
        //'./app/server/logs/requests':   { events: ['request'] },
        //'./app/server/logs/errors/':    { events: ['error'] }
    }
};

server.route([
    // app static files
    { method: 'GET', path: '/app/{name}',  handler: function(request, reply) {
        debugger;
    } },  //{ directory: { path: './app/client/{name}' } }

    // load all of the static bower component routes
    { method: 'GET', path: '/src/{name}',  handler: { directory: { path: require('./static-routes-bower')} } },


    // load the index.html page
    { method: 'GET', path: '/', handler: { file: './app/server/pages/index.html'  } }
]);


server.pack.register(
    [
        { plugin: require('ckProducts') },
        { plugin: require('good'), options: options }
    ],

    function(err) {
        if (err) throw err;
    }
);

server.start(function() {
    server.log(['log'], 'Hapi server started.');
});

