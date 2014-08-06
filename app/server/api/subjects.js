/**
 * Created by ckelkboom on 6-8-14.
 */


var request = require('request'),
    config  = require('./../db-config-debug'),
    api     = function(server) {
        server.route([
            {method: 'GET', path: '/subjects', handler: function(req, reply) {
                var url = config.database('quizzer_references') + '/_design/references/_view/queryReferencesByEntity?key=%22subject%22';

                request({
                    uri:  url,
                    method: 'GET'
                }, function(err, response, body) {
                    var result = JSON.parse(body);
                    reply(result.rows.map(function(row) {
                        if (!row.value.image) row.value.image = 'subject_default.jpg';
                        return row.value;
                    }));
                });
            }}
        ]);

    };


module.exports = api;