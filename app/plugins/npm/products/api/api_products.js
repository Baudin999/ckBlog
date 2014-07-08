var api = {
    // /products
    get: function(req, reply) {
        reply('Hello form the products route');
    },

    // /products/{id}
    getById: function(req, reply) {
        reply('Information of: ' + req.params.id);
    }
};

module.exports = api;