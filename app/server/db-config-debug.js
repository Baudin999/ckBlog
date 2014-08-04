

var uuid = require('node-uuid'),
    config = {
        path:       'localhost',
        port:       '5984',
        version:    '0.0.1'
    };
config.database = function(name) {
    return 'http://' + config.path + ':' + config.port + '/' + name;
};
config.view = function(databaseName, viewName) {
    return config.database(databaseName) + '/_design/' + databaseName + '/_view/' + viewName;
};
config.uuid = function() {
    return uuid.v1();
};

module.exports = config;