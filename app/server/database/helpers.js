/**
 * Created by ckelkboom on 4-8-14.
 */

var request =   require('request');
    Container = function(config) {
        // the container constructor
        this.databaseCreated = false;
        this.config = config;
    };

Container.prototype.createDatabase = function(name) {
    var self        = this,
        handlers    = [],
        args        = Array.prototype.slice.call(arguments);

    handlers = args.filter(function(arg) {
        return typeof arg === 'function';
    });

    var response = request.get(self.config.database(name), function(error, response, body) {
        if (response.statusCode == 404) {
            console.log('Database ' + name + ' does not exist. Creating database...');
            request.put(self.config.database(name), function(error, response, body) {
                console.log('Database ' + name + ' created...');
                self.databaseCreated = true;
                self.createDatabase.apply(self, args);
            });
        } else {
            console.log('Database ' + name + ' exists');
            if (!self.databaseCreated) return;

            handlers.map(function(handler) {
                handler();
            });
        }
    });
};

Container.prototype.insertDocuments= function(databaseName, documents, entityName) {
    var self                        = this,
        processed_documents_length  = 0,
        documents_length            = documents.length;

    var insertDocument = function(d) {
        if (!d.entity && entityName) d.entity = entityName;
        request.put({
            url: self.config.database(databaseName) + '/' + self.config.uuid(),
            body: JSON.stringify(d)
        },
        function(err, resp, body) {
            if (err) {
                console.log(err);
                throw err;
            }
            else processed_documents_length += 1;
        });
    };

    documents.map(function(document) {
        insertDocument(document);
    });

    (function wait_for_it() {
        if (processed_documents_length != documents_length) {
            setTimeout(function() {
                wait_for_it();
            }, 40);
        } else {
            console.log('inserted ' + processed_documents_length + ' documents into database ' + databaseName + '.');
        }
    })();

};

module.exports = Container;
