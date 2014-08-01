
var request = require('request-promise'),
    config = require('./../db-config-debug'),
    api = function(server) {
        server.route([
            {method: 'PUT', path: '/validate/username', handler: function(req, reply) {

                request({
                    uri: config.view('users', 'queryUserByUsername') + '?key=%22' + req.payload.username + '%22',
                    method: 'GET'
                }).then(function(result) {
                    reply({
                        isValid: JSON.parse(result).rows.length == 0
                    });
                });
            }}
        ]);
    };


module.exports = api;

