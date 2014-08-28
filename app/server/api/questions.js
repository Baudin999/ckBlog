
var api = function(server) {

    server.route([
        {
            method: 'GET', path: '/questions', handler: function(req, reply) {

                var questions = [];
                for (var i = 1; i < 100; ++i) {
                    questions.push({
                        id: i, name: 'Question ' + i, description: 'The description of Question ' + i
                    });
                }
                reply(questions);
            }
        },
        {
            method: 'GET', path: '/questions/{id}', handler: function(req, reply) {
                var _id = req.params.id;
                reply({
                    id: _id, name: 'Question ' + _id, description: 'The description of Question ' + _id
                });
            }
        }
    ]);

};


module.exports = api;

