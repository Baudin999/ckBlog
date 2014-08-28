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
            }},
            {
                method: 'GET', path: '/subjects/{key}',
                handler: function(req, reply) {
                    var url = config.database('quizzer_references') +
                        '/_design/references/_view/queryReferencesByEntityAndName?key=[%22subject%22,%22' +
                        req.params.key + '%22]';

                    request({
                        url: url,
                        method: 'GET'
                    }, function(err, response, body) {
                        var result = JSON.parse(body);
                        if (result.rows.length > 0) {
                            reply(result.rows[0].value);
                        }
                        else {
                            reply('A subject with name ' + req.params.key + ' was not found!').code(404);
                        }
                    });
                }
            },
            {
                method: 'POST', path: '/subjects/{key}',
                handler: function(req, reply) {

                    console.log(req.params.key);

                    reply('success');
                }
            },
            {
                method: 'GET', path: '/subjects/{name}/questions',
                handler: function(req, reply) {
                    var questions = [
                        { name: 'Question 01', description: 'Description of question 01' },
                        { name: 'Question 02', description: 'Description of question 02' }
                    ];

                    reply(questions);
                }
            },
            {
                method: 'POST', path: '/subjects/{name}/questions',
                handler: function(req, reply) {

                    reply('success');
                }
            }
        ]);

    };


module.exports = api;