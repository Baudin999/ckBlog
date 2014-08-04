

module.exports = function(config) {
    var request     = require('request'),
        Helpers     = require('./helpers'),
        helpers     = new Helpers(config);

    var users_design = {
        "_id": "_design/quizzer_users",
        "views": {
            "queryUserByUsername": {
                "map": "function(doc) {\n  emit(doc.username, doc);\n}"
            }
        }
    };

    helpers.createDatabase('quizzer_data');
    helpers.createDatabase('quizzer_system', function() {
        helpers.insertDocuments('quizzer_system', [
            { version: config.version, type: 'couchDB' }
        ], 'database_version')
    });
    helpers.createDatabase('quizzer_users',
        function() {
            request({
                url: config.database('quizzer_users') + '/_design/quizzer_users',
                body: JSON.stringify(users_design),
                method: 'PUT'
            }, function() { });
        }
    );
    helpers.createDatabase('quizzer_references',
        function() {
            helpers.insertDocuments('quizzer_references', require('./data_categories'), 'category');
        }
    );

};
