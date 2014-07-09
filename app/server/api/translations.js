

var api = function(server) {

    server.route([
        {method: 'GET', path: '/translations/{page}', handler: function(req, reply) {

            var result = require('../translations/' + req.params.page + 'Translations');
            reply(result);

        }}
    ]);

};


module.exports = api;