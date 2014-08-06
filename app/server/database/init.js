

module.exports = function(config) {
    var request     = require('request'),
        Helpers     = require('./helpers'),
        helpers     = new Helpers(config);

    helpers.createDatabase('quizzer_data');
    helpers.createDatabase('quizzer_system', function() {
        helpers.insertDocuments('quizzer_system', [
            { version: config.version, type: 'couchDB' }
        ], 'database_version')
    });
    helpers.createDatabase('quizzer_users',
        function() { helpers.insertDesignDocument('quizzer_users', 'quizzer_users', require('./design_quizzer_users')) }
    );
    helpers.createDatabase('quizzer_references',
        function() { helpers.insertDesignDocument('quizzer_references', 'references', require('./design_quizzer_references')) },
        function() { helpers.insertDocuments('quizzer_references', require('./data_categories'), 'category'); },
        function() { helpers.insertDocuments('quizzer_references', require('./data_subjects'), 'subject'); }
    );

};
