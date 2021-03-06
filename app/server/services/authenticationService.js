

var service = { },
    Hapi            = require('hapi'),
    Joi             = require('joi'),
    request         = require('request'),
    querystring     = require('querystring'),
    config          = require('./../db-config-debug'),
    passwordHash    = require('password-hash');



service.loginConfig =  {
    handler: function(req, reply) {

        var qString = 'key=%22' + encodeURIComponent(req.payload.username) + '%22';

        request({
            uri: config.view('quizzer_users', 'queryUserByUsername') + '?' + qString,
            method: 'GET'
        }, function(err, response, body) {
            var row_result = JSON.parse(body);
            if (row_result.rows.length > 0) {
                var user = row_result.rows[0].value,
                    isPasswordValid = passwordHash.verify(req.payload.password, user.password);
                if (isPasswordValid) {
                    delete user.password;
                    req.auth.session.set(user);
                    reply.redirect('/');
                }
            }

            var error = Hapi.error.unauthorized('Invalid username or password');
            error.output.statusCode = 501;    // Assign a custom error code
            error.reformat();

            reply.redirect('/login');
        });
    },
    validate: {
        payload: Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required()
        }).options({ stripUnknown: true })
    }
};



service.logoutConfig =  {
    handler: function(request, reply) {
        request.auth.session.clear();
        reply.redirect('/login');
    },
    auth: 'session'
};



service.createAccountConfig =  {
    handler: function(req, reply) {
        var user = req.payload;

        // hash the password
        user.password = passwordHash.generate(user.password);

        // set the displayname of the user
        if (user.firstName && user.lastName) {
            user.displayName = user.firstName + ' ' + user.lastName;
        }
        else {
            user.displayName = user.username;
        }

        request({
            uri: config.database('quizzer_users') + '/' + config.uuid(),
            method: 'PUT',
            body: JSON.stringify(user)
        }, function(err, response, body) {
            var result = JSON.parse(body);
            if (result.ok) {
                reply.redirect('/login');
            } else {
                console.log(result);
                reply(result);
            }
        });
    },
    validate: {
        payload: Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required()
        }).options({ allowUnknown: true })
    }
};

module.exports = service;