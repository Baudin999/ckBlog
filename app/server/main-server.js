

var Hapi        = require('hapi'),
    server      = new Hapi.Server(1337, 'localhost');

console.log(__dirname);

var options = {
    //relativeTo : __dirname,
    subscribers: {
        'console':                      { events: ['log', 'error'] }//,
        //'./app/server/logs/requests':   { events: ['request'] },
        //'./app/server/logs/errors/':    { events: ['error'] }
    }
};

server.route([
    { method: 'GET', path: '/template/{name}',  handler: { directory: { path: [
        '/app/client/templates',
        '/app/client'
    ]} } },
    { method: 'GET', path: '/',                 handler: { file: { path: '/app/server/root/index.html' } } }
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

