

module.exports = function(config) {
    var request =   require('request');


    (function verify_users_database() {
        var response = request.get(config.database('users'), function(error, response, body) {
            if (response.statusCode == 404) {
                console.log('Database users does not exist. Creating database...');
                request.put(config.database('users'), function(error, response, body) {
                    console.log('Database created...');
                    verify_users_database();
                });
            } else {
                console.log('Database users exists');
                verify_quizzer_database();
            }
        });
    })();

    var category_length = 0,
        quizzer_database_created = false;

    var verify_quizzer_database = function() {
        var response = request.get(config.database('quizzer'), function(error, response, body) {
            if (response.statusCode == 404) {
                console.log('Database quizzer does not exist. Creating database...');
                request.put(config.database('quizzer'), function(error, response, body) {
                    console.log('Database created...');
                    quizzer_database_created = true;
                    verify_quizzer_database();
                });
            } else {
                console.log('Database quizzer exists');
                if (!quizzer_database_created) return;

                // Add the categories
                var categories = require('./data_categories');
                categories.map(function(category) {
                    insert_document(category);
                });
                (function wait_for_it() {
                    if (categories.length != category_length) {
                        setTimeout(function() {
                            wait_for_it();
                        }, 40);
                    } else {
                        console.log('inserted ' + category_length + ' categories.');
                    }
                })();
            }
        });
    };

    var insert_document = function(document) {
        request.put(
            {
                url: config.database('quizzer') + '/' + config.uuid(),
                body: JSON.stringify(document)
            },
            function(err, resp, body) {
                if (err) console.log(err);
                else category_length += 1;
            });
    };
};
