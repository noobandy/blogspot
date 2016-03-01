"use strict";

var App = angular.module("App");

App.controller("NavbarController", ["$scope", "AuthenticationManager", "$state",
    function ($scope, AuthenticationManager, $state) {

        function newLoginModel() {
            return {
                username: "",
                password: "",
                wrongCredentials: false
            };
        }

        $scope.loginModel = newLoginModel();

        $scope.login = function () {
            AuthenticationManager.authenticate($scope.loginModel.username,
                $scope.loginModel.password).then(function (success) {

                    $scope.loginModel = newLoginModel();

                    $state.go("blog list");

                }, function (error) {
                    $scope.loginModel.wrongCredentials = true;
                });
        };


        $scope.logout = function () {
            AuthenticationManager.logout();
            $state.go("home");
        };


    }]);


App.controller("HomeController", ["$scope", "User", "$state", "Blog",
    function ($scope, User, $state, Blog) {
        $scope.alerts = [];

        function newRegistrationModel() {
            return {
                emailId: "",
                username: "",
                password: "",
                repeatPassword: "",
                usernameAvailable: true,
                blogName: ""
            };
        }

        $scope.registrationModel = newRegistrationModel();

        $scope.regisetr = function () {
            User.register($scope.registrationModel.emailId, $scope.registrationModel.username,
                $scope.registrationModel.password).
                then(function (data) {

                    $scope.alerts.unshift({
                        type: "success",
                        message: "User registered successfully. Check your mail for further instructions"
                    });

                }, function (error) {
                    $scope.alerts.unshift({
                        type: "danger",
                        message: "User registration failed. Please retry after sometime"
                    });
                });
        };

        $scope.blogs = Blog.query({});
    }]);


App.controller("BlogListController",["$scope","$rootScope", "Blog",
    function($scope, $rootScope, Blog) {

        $scope.alerts = [];

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.newBlog = new Blog();

        $scope.blogs = Blog.query({owner: $rootScope.authenticatedUser});

        $scope.addBlog = function() {

            $scope.newBlog.$save().then(function(result) {

                $scope.blogs.unshift($scope.newBlog);

                $scope.newBlog = new Blog();

                $scope.alerts.unshift({
                    type: "success",
                    message: "Blog Added"
                });
            }, function(error) {
                $scope.alerts.unshift({
                    type: "danger",
                    message: "Failed to add blog"
                });
            });
        }
    }]);

App.controller("PostListController",["$scope","$stateParams", "Post",
    function($scope, $stateParams, Post) {
        $scope.blogId = $stateParams.blogId;

        $scope.posts = Post.query({blogId: $scope.blogId});

    }]);

App.controller("PostEditController",["$scope","$stateParams", "Post", "$state",
    function($scope, $stateParams, Post, $state) {

        $scope.blogId = $stateParams.blogId;
        $scope.postId = $stateParams.postId;

        if($scope.postId === 'new') {

            $scope.new = true;
            $scope.post = new Post({blogId: $scope.blogId});
        } else {
            $scope.post = Post.get({blogId: $scope.blogId, postId: $scope.postId});
        }

        $scope.savePost = function() {

            if($scope.postId === 'new') {

                $scope.post.$save().then(function(result) {

                    $state.go("posts", {blogId: $scope.blogId});
                });
            } else {
                $scope.post.$update().then(function(result) {

                    $state.go("posts", {blogId: $scope.blogId});
                });
            }

        }

    }]);


App.controller("PostController",["$scope","$stateParams", "Post", "$state",
    "Comment",
    function($scope, $stateParams, Post, $state, Comment) {

        $scope.blogId = $stateParams.blogId;
        $scope.postId = $stateParams.postId;

        $scope.alerts = [];

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.post = Post.get({blogId: $scope.blogId, postId: $scope.postId});

        $scope.deletePost = function() {
            $scope.post.$remove().then(function(result) {
               $state.go("posts", {blogId: $scope.blogId});
            });
        };

        $scope.comments = Comment.query({postId: $scope.postId});


        $scope.newComment = new Comment({postId: $scope.postId});

        $scope.addComment = function() {

            $scope.newComment.$save().then(function(result) {

                $scope.comments.unshift($scope.newComment);

                $scope.newComment = new Comment({postId: $scope.postId});

                $scope.alerts.unshift({
                    type: "success",
                    message: "Comment Added"
                });
            }, function(error) {
                $scope.alerts.unshift({
                    type: "danger",
                    message: "Failed to add comment"
                });
            });
        }
    }]);

App.controller("AboutController", ["$scope",
    function ($scope) {

    }]);


App.controller("ForgotPasswordController", ["$scope", "User",
    function ($scope, User) {
        $scope.username = "";

        $scope.alerts = [];

        $scope.sendPasswordResetLink = function () {
            User.sendPasswordResetLink($scope.username).then(function (result) {
                if (result.data.success) {
                    $scope.alerts.unshift({
                        type: "success",
                        message: "Follow password reset instructions send to your registered email."
                    });
                } else {
                    $scope.alerts.unshift({type: "danger", message: "User not found"});
                }
            }, function (error) {
                $scope.alerts.unshift({type: "danger", message: "request failed please try later"});
            })
        }
    }]);

App.controller("ChangePasswordController", ["$scope", "$rootScope", "User", "AuthenticationManager", "$state",
    function ($scope, $rootScope, User, AuthenticationManager, $state) {
        function newPasswordChangeModel() {
            return {
                oldPassword: "",
                password: "",
                repeatPassword: "",
                wrongCredentials: false
            };
        }

        $scope.alerts = [];

        $scope.passwordChangeModel = newPasswordChangeModel();

        $scope.changePassword = function () {
            User.changePassword($rootScope.authenticatedUser, $scope.passwordChangeModel.oldPassword, $scope.passwordChangeModel.password).then(function (result) {
                if (result.data.success) {
                    $scope.alerts.unshift({
                        type: "success",
                        message: "Password Changed Successfully. Login using new password."
                    });

                    AuthenticationManager.logout();

                    $state.go("home");

                } else {
                    $scope.passwordChangeModel.wrongCredentials = true;
                }

            });
        };


    }]);
