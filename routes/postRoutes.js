//Created by anandm at 01-Mar-16

"use strict";
var path = require("path");
var Joi = require("joi");
var Boom = require("boom");

var Post = require(path.join(__dirname, "../models/Post"));

var routes = [{
        method: "GET",
        path: "/blogs/{blogId}/posts",
        config: {
            validate: {
                params: {
                    //mongodb object id
                    blogId: Joi.string().hex().length(24).required()
                }
            },
            handler: function (request, reply) {
                Post.find({blogId: request.params.blogId}).sort({postedAt: -1}).exec(function (err, docs) {

                    if (err) {
                        return reply(Boom.badImplementation(err));
                    }

                    return reply(docs);

                });
            },
            description: "Get all Post",
            notes: "notes",
            tags: ["Post"]
        }
    }, {
        method: "GET",
        path: "/blogs/{blogId}/posts/{postId}",
        config: {
            validate: {
                params: {
                    //mongodb object id
                    blogId: Joi.string().hex().length(24).required(),
                    postId: Joi.string().hex().length(24).required()
                }
            },
            handler: function (request, reply) {
                var blogId = request.params.blogId;
                var postId = request.params.postId;

                Post.findById(postId, function (err, doc) {

                    if (err) {
                        return reply(Boom.badImplementation(err));
                    }

                    if (!doc) {
                        return reply(Boom.notFound("Not Found"));
                    }

                    return reply(doc);
                })
            },
            description: "Get Post",
            notes: "notes",
            tags: ["Post"]
        }
    }, {
        method: "POST",
        path: "/blogs/{blogId}/posts",
        config: {
            auth: "jwt",
            validate: {
                params: {
                    //mongodb object id
                    blogId: Joi.string().hex().length(24).required()
                },
                payload: {
                    title: Joi.string().required(),
                    content: Joi.string().required()
                },
                options: {
                    allowUnknown: true
                }
            },
            handler: function (request, reply) {
                var blogId = request.params.blogId;

                var payload = request.payload;
                payload.blogId = blogId;

                var resource = new Post(payload);

                resource.save(function (err, doc) {

                    if (err) {
                        return reply(Boom.badImplementation(err));
                    }

                    return reply(doc);
                });

            },
            description: "Create a new Post",
            notes: "notes",
            tags: ["Post"]
        }
    }, {
        method: "PUT",
        path: "/blogs/{blogId}/posts/{postId}",
        config: {
            auth: "jwt",
            validate: {
                params: {
                    //mongodb object id
                    blogId: Joi.string().hex().length(24).required(),
                    postId: Joi.string().hex().length(24).required()
                },
                payload: {
                    title: Joi.string().required(),
                    content: Joi.string().required()
                },
                options: {
                    allowUnknown: true
                }
            },
            handler: function (request, reply) {
                var blogId = request.params.blogId;
                var postId = request.params.postId;

                var payload = request.payload;


                Post.update({_id: postId, blogId: blogId}, {$set: payload}, function (err, result) {

                    if (err) {
                        return reply(Boom.badImplementation(err));
                    }

                    return reply();
                });
            },
            description: "Update Post",
            notes: "notes",
            tags: ["Post"]
        }
    }, {
        path: "/blogs/{blogId}/posts/{postId}",
        method: "DELETE",
        config: {
            auth: "jwt",
            validate: {
                params: {
                    //mongodb object id
                    blogId: Joi.string().hex().length(24).required(),
                    postId: Joi.string().hex().length(24).required()
                }
            },
            handler: function (request, reply) {
                var blogId = request.params.blogId;
                var postId = request.params.postId;

                Post.remove({_id: postId}, function (err, result) {

                    if (err) {
                        return reply(Boom.badImplementation(err));
                    }

                    return reply();
                });
            },
            description: "Delete Post",
            notes: "notes",
            tags: ["Post"]
        }
    }];

module.exports = routes;