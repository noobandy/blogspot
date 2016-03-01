var path = require("path");
var Joi = require("joi");
var Boom = require("boom");

var User = require(path.join(__dirname, "../models/user"));

var routes = [{
	method : "POST",
	path : "/users",
	config : {
		validate : {
			payload : {
                username : Joi.string().min(6),
                password : Joi.string().min(6),
                emailId : Joi.string().email().required()
			}
		},
		handler : function(request, reply) {
            User.register(request.payload, function(err, user) {

                if(err) {
                    return reply(Boom.badImplementation(err.message));
                }
                //send activation link

                //clear password filed
                delete user.password;

                reply(user);
            });
		}
	}
}];

module.exports = routes;