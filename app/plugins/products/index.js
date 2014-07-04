


exports.register = function (plugin, options, callback) {



    plugin.route({
        method: 'GET',
        path: '/products',
        handler: function(request, reply) {
            reply('Hello products');
        }
    });

    callback();

};

exports.register.attributes = {
    pkg: require("./package.json")
};
