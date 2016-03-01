"use strict";

angular.module("App").config(["$stateProvider", "$urlRouterProvider",
    function ($stateProvider, $urlRouterProvider) {

        // For any unmatched url, redirect to /
        $urlRouterProvider.otherwise("/");

        $stateProvider.state({
            name: "home",
            url: "/",
            templateUrl: "/public/app/templates/home.html",
            controller: "HomeController",
            data: {
                secure: false
            }
        }).state({
            name: "about",
            url: "/about",
            templateUrl: "/public/app/templates/about.html",
            controller: "AboutController",
            data: {
                secure: false
            }
        }).state({
            name: "forgot password",
            url: "/forgotpassword",
            templateUrl: "/public/app/templates/forgotpassword.html",
            controller: "ForgotPasswordController",
            data: {
                secure: false
            }
        }).state({
            name: "change password",
            url: "/changepassword",
            templateUrl: "/public/app/templates/changepassword.html",
            controller: "ChangePasswordController",
            data: {
                secure: true
            }
        }).state({
            name: "blog list",
            url: "/blogs",
            templateUrl: "/public/app/templates/blogs.html",
            controller: "BlogListController",
            data: {
                secure: false
            }
        }).state({
            name: "posts",
            url: "/blogs/:blogId/posts",
            templateUrl: "/public/app/templates/posts.html",
            controller: "PostListController",
            data: {
                secure: false
            }
        }).state({
            name: "edit post",
            url: "/blogs/:blogId/posts/:postId",
            templateUrl: "/public/app/templates/postEdit.html",
            controller: "PostEditController",
            data: {
                secure: true
            }
        }).state({
            name: "view post",
            url: "/blogs/:blogId/posts/:postId/view",
            templateUrl: "/public/app/templates/post.html",
            controller: "PostController",
            data: {
                secure: false
            }
        });
    }]);


//ensure that user is authecticate before state change for secure states
App.run(["$rootScope", "AuthenticationManager",
    function ($rootScope, AuthenticationManager) {
        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            if (toState.data && toState.data.secure && !AuthenticationManager.isAuthenticated()) {
                event.preventDefault();
            }
        });
    }]);