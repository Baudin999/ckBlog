

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
    { method: 'GET', path: '/controllers/{name}',  handler: { directory: { path: '/app/client/controllers' } } },
    { method: 'GET', path: '/views/{name}',  handler: { directory: { path: '/app/client/views' } } },
    { method: 'GET', path: '/app/{name}',  handler: { directory: { path: '/app/client' } } },

    // load all of the static bower component routes
    { method: 'GET', path: '/src/{name}',  handler: { directory: { path: require('./static-routes-bower')} } },
    { method: 'GET', path: '/js/metro/{name}',  handler: { directory: { path: '/bower_components/Metro-UI-CSS/js'} } },
    { method: 'GET', path: '/fonts/{name}',  handler: { directory: { path: [
        '/bower_components/Metro-UI-CSS/fonts',
        '/bower_components/fontawesome/fonts'
    ] } } },

    // load the index.html page
    { method: 'GET', path: '/', handler: { file: './app/server/pages/index.html'  } }
]);

// add api
require('./api/questions.js')(server);

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

