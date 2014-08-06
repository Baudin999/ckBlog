

var generalTranslations = require('../translations/generalTranslations');
    api = function(server) {

    server.route([
        {method: 'GET', path: '/translations/{page}', handler: function(req, reply) {

            var translations = require('../translations/' + req.params.page + 'Translations');
            var result;

            if (typeof translations === 'function') result = translations();
            else result = translations;

            for (key in generalTranslations) {
                if (!result[key]) {
                    result[key] = generalTranslations[key];
                }
            }

            reply(result);

        }}
    ]);

};


module.exports = api;