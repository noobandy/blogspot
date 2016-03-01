//Created by anandm at 01-Mar-16

"use strict";
var path = require("path");
var Joi = require("joi");
var Boom = require("boom");

var Comment = require(path.join(__dirname, "../models/Comment"));

var routes = [{
    method: "GET",
    path: "/posts/{postId}/comments",
    config: {
        validate: {
            params: {
                //mongodb object id
                postId: Joi.string().hex().length(24).required()
            }
        },
        handler: function (request, reply) {
            var postId = request.params.postId;
            Comment.find({postId: postId}).sort({postedAt: -1}).exec(function (err, docs) {

                if (err) {
                    return reply(Boom.badImplementation(err));
                }

                return reply(docs);

            });
        },
        description: "Get all Comment",
        notes: "notes",
        tags: ["Comment"]
    }
}, {
    method: "GET",
    path: "/posts/{postId}/comments/{commentId}",
    config: {
        validate: {
            params: {
                //mongodb object id
                postId: Joi.string().hex().length(24).required(),
                commentId: Joi.string().hex().length(24).required()
            }
        },
        handler: function (request, reply) {
            var postId = request.params.postId;
            var commentId = request.params.commentId;

            Comment.findById(commentId, function (err, doc) {

                if (err) {
                    return reply(Boom.badImplementation(err));
                }

                if (!doc) {
                    return reply(Boom.notFound("Not Found"));
                }

                return reply(doc);
            })
        },
        description: "Get Comment",
        notes: "notes",
        tags: ["Comment"]
    }
}, {
    method: "POST",
    path: "/posts/{postId}/comments",
    config: {
        validate: {
            params: {
                //mongodb object id
                postId: Joi.string().hex().length(24).required()
            },
            payload: {
                username: Joi.string().required(),
                emailId: Joi.string().email().required(),
                comment: Joi.string().required()
            },
            options: {
                allowUnknown: true
            }
        },
        handler: function (request, reply) {
            var postId = request.params.postId;

            var payload = request.payload;

            var resource = new Comment(payload);

            resource.postId = postId;

            resource.save(function (err, doc) {

                if (err) {
                    return reply(Boom.badImplementation(err));
                }

                return reply(doc);
            });

        },
        description: "Create a new Comment",
        notes: "notes",
        tags: ["Comment"]
    }
}, {
    method: "PUT",
    path: "/posts/{postId}/comments/{commentId}",
    config: {
        validate: {
            params: {
                //mongodb object id
                postId: Joi.string().hex().length(24).required()
            },
            payload: {
                username: Joi.string().required(),
                emailId: Joi.string().email().required(),
                comment: Joi.string().required()
            },
            options: {
                allowUnknown: true
            }
        },
        handler: function (request, reply) {
            var postId = request.params.postId;
            var commentId = request.params.commentId;

            var payload = request.payload;

            Comment.update({_id: commentId, postId: postId}, {$set: payload}, function (err, result) {

                if (err) {
                    return reply(Boom.badImplementation(err));
                }

                return reply();
            });
        },
        description: "Update Comment",
        notes: "notes",
        tags: ["Comment"]
    }
}, {
    method: "DELETE",
    path: "/posts/{postId}/comments/{commentId}",
    config: {
        validate: {
            params: {
                //mongodb object id
                postId: Joi.string().hex().length(24).required(),
                commentId: Joi.string().hex().length(24).required()
            }
        },
        handler: function (request, reply) {
            var postId = request.params.postId;
            var commentId = request.params.commentId;

            Comment.remove({_id: commentId}, function (err, result) {

                if (err) {
                    return reply(Boom.badImplementation(err));
                }

                return reply();
            });
        },
        description: "Delete Comment",
        notes: "notes",
        tags: ["Comment"]
    }
}];

module.exports = routes;