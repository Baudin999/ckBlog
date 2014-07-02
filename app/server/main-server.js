

var Hapi        = require('hapi'),
    ckProducts  = require('ckProducts'),
    server      = new Hapi.Server(1337, 'localhost');




server.pack.register(

    [{ plugin: ckProducts }],

    function(err) {
        if (err) throw err;
        server.start(function() {
            console.log('Hapi server started.')
        });
    }
);

