//Created by anandm at 01-Mar-16

"use strict";
var path = require("path");
var Joi = require("joi");
var Boom = require("boom");

var Blog = require(path.join(__dirname, "../models/Blog"));

var routes = [{
    method: "GET",
    path: "/blogs",
    config: {
        validate: {
            query: {
                owner: Joi.string()
            }
        },
        handler: function (request, reply) {
            var owner = request.query.owner;

            var filter = {};

            if (owner) {
                filter.owner = owner;
            }

            Blog.find(filter, function (err, docs) {

                if (err) {
                    return reply(Boom.badImplementation(err));
                }

                return reply(docs);

            });
        },
        description: "Get all Blog",
        notes: "notes",
        tags: ["Blog"]
    }
}, {
    method: "GET",
    path: "/blogs/{id}",
    config: {
        validate: {
            params: {
                //mongodb object id
                id: Joi.string().hex().length(24).required()
            }
        },
        handler: function (request, reply) {
            var id = request.params.id;

            Blog.findById(id, function (err, doc) {

                if (err) {
                    return reply(Boom.badImplementation(err));
                }

                if (!doc) {
                    return reply(Boom.notFound("Not Found"));
                }

                return reply(doc);
            })
        },
        description: "Get Blog",
        notes: "notes",
        tags: ["Blog"]
    }
}, {
    method: "POST",
    path: "/blogs",
    config: {
        auth: "jwt",
        validate: {
            payload: {
                name: Joi.string().required()
            }
        },
        handler: function (request, reply) {
            var payload = request.payload;

            var resource = new Blog(payload);

            resource.owner = request.auth.credentials.username;

            resource.save(function (err, doc) {

                if (err) {
                    return reply(Boom.badImplementation(err));
                }

                return reply(doc);
            });

        },
        description: "Create a new Blog",
        notes: "notes",
        tags: ["Blog"]
    }
}, {
    method: "PUT",
    path: "/blogs/{id}",
    config: {
        auth: "jwt",
        validate: {
            params: {
                //mongodb object id
                id: Joi.string().hex().length(24).required()
            },
            payload: {
                name: Joi.string().required()
            }
        },
        handler: function (request, reply) {
            var id = request.params.id;
            var payload = request.payload;


            Blog.update({
                _id: id,
                owner: request.auth.credentials.username
            }, {$set: payload}, function (err, result) {

                if (err) {
                    return reply(Boom.badImplementation(err));
                }

                return reply();
            });
        },
        description: "Update Blog",
        notes: "notes",
        tags: ["Blog"]
    }
}, {
    method: "DELETE",
    path: "/blogs/{id}",
    config: {
        auth: "jwt",
        validate: {
            params: {
                //mongodb object id
                id: Joi.string().hex().length(24).required()
            }
        },
        handler: function (request, reply) {
            var id = request.params.id;

            Blog.remove({_id: id, owner: request.auth.credentials.username}, function (err, result) {

                if (err) {
                    return reply(Boom.badImplementation(err));
                }

                return reply();
            });
        },
        description: "Delete Blog",
        notes: "notes",
        tags: ["Blog"]
    }
}];

module.exports = routes;