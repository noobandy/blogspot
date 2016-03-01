var App = angular.module("App");

App.factory("Blog", ["$resource", "AppConfig",
    function ($resource, AppConfig) {

        return $resource(AppConfig.basePath + "blogs/:id", {
            id: "@_id"
        }, {
            update: {
                method: "PUT"
            }
        })
    }]);

App.factory("Post", ["$resource", "AppConfig",
    function ($resource, AppConfig) {

        return $resource(AppConfig.basePath + "blogs/:blogId/posts/:postId", {
            blogId: "@blogId",
            postId: "@_id"
        }, {
            update: {
                method: "PUT"
            }
        })
    }]);


App.factory("Comment", ["$resource", "AppConfig",
    function ($resource, AppConfig) {

        return $resource(AppConfig.basePath + "posts/:postId/comments/:commentId", {
            postId: "@postId",
            commentId: "@_id"
        }, {
            update: {
                method: "PUT"
            }
        })
    }]);