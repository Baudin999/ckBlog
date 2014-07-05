
var api = require('./api/api_products');

exports.register = function (plugin, options, callback) {

    plugin.route([
        { method: 'GET', path: '/products', handler: api.get },
        { method: 'GET', path: '/products/{id}', handler: api.getById },

        // static routes
        { method: 'GET', path: '/product_template/{name}', handler: { directory: { path: '/node_modules/ckProducts/templates' } } }

    ]);

    callback();

};

exports.register.attributes = {
    pkg: require("./package.json")
};
