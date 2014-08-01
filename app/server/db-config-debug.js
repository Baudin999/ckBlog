

var uuid = require('node-uuid'),
    config = {
        path: 'localhost',
        port: '5984'
    };
config.database = function(name) {
    return 'http://' + config.path + ':' + config.port + '/' + name;
};
config.view = function(databaseName, viewName) {
    return config.database(databaseName) + '/_design/users/_view/' + viewName;
};
config.uuid = function() {
    return uuid.v1();
};

module.exports = config;