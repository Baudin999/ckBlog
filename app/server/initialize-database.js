
/*
This file is the root file for the database transactions which are needed for the quizzer application.
Every version of the database and every transformation will be handled in a different file.
 */

(function() {

    console.log('initializing database');
    var config = require('./db-config-debug');
    require('./database/init')(config);
})();