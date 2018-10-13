/*it will a bridge between frontend and backend supporting forumService Functions which includes showing all the posts, create post, edit post, delete post, update post and managing the comments */
'use strict';
angular.module('app')
    .controller('forumController', ['$rootScope','$scope','$http','$state','$window','socket', function ($rootScope,$scope,$http,$state,$window,socket ) {

        // To Get the box
        var box = document.getElementById('mybox');

        // To get the element that close the box
        var closelink = document.getElementsByClassName("close")[0];

        // When the user clicks on closelink
        closelink.onclick = function() {
            box.style.display = "none";
        };

        // on click outside the box anywhere close it
        window.onclick = function(event) {
            if (event.target == box) {
                box.style.display = "none";
            }
        };

        //listening for event connectlink
        socket.on('connectlink', function (data) {
            var user = {};
            $scope.users = [];
            user.message = data;
            user.date = new Date();
            $scope.users.push(user);
            box.style.display = "block";
        });

        //getting all posts
        function init() {
            getAllPosts();

        }
        init();

        $(document).ready(function() {
            //Scroll to bottom of page on click of the post
            $('#postclick').click(function(){
                $('html, body').animate({scrollTop:$(document).height()}, 'fast');
                return false;
            });

            //For move to top functionality. Checks visibility of box, as when it should appear.
            $(window).scroll(function () {
                if ($(this).scrollTop() > 540) {
                    $('.totop').fadeIn(500);
                } else {
                    $('.totop').fadeOut(500);
                }
            });
            //scrolls the page to the top
            $('.totop').click(function (message) {
                message.preventDefault();
                $('html, body').animate({scrollTop: 0});
            });

        });
        // Shows all the posts to the users
        function getAllPosts() {
            $http
                .get('/api/forum')
                .success(function (posts) {
                    $scope.posts = posts;
                });
        }

        //To create a post
        $scope.createPost = createPost;

        function createPost(post) {
            var user= $window.sessionStorage.getItem('user');
            post.user = user;
            $http
                .post('/api/forum', post)
                .success(getAllPosts);
        }

        //To delete a post
        $scope.deletePost = deletePost;

        function deletePost(postId) {
            $http
                .delete('/api/forum/' + postId)
                .success(getAllPosts);
        }

        //To edit a post
        $scope.editPost = editPost;

        function editPost(postId) {

            $http
                .get('/api/forum/'+postId)
                .success(function (post) {
                    $scope.post = post;
                    ScrollPagetoTop();
                });
        }
        var ScrollPagetoTop = function() {
            window.scrollTo(0, 0);
        };

        //To update a post
        $scope.updatePost = updatePost;

        function updatePost(post) {
            $http
                .put('/api/forum/', post)
                .success(function (post) {
                    $scope.post = post;
                    window.location.reload();
                });
        }

        //To comment to a post
        $scope.commentPost = commentPost;

        function commentPost(post) {
            var user= $window.sessionStorage.getItem('user')
            post.user = user
            $scope.records = [];
            $scope.recordsDate = [];
            $scope.receivedComment = {};

            $http
                .post('/api/forum/comment/', post)
                .success(function (getAllPosts) {
                });
            $http
                .get('/api/forum/comment/'+post._id)
                .success(function (response) {
                    $scope.receivedComment = response;
                    for(var i=0;i<$scope.receivedComment.length;i++){
                        $scope.records.push([$scope.receivedComment[i].comment, $scope.receivedComment[i].postDate,$scope.receivedComment[i].username]);
                    }
                    post.comment= "";

                });
            socket.emit('sendevent', post);
        }

        //To get comments
        $scope.getComments = getComments;
            function getComments(post) {
            $scope.records = [];
            $scope.recordsDate = [];
            $scope.receivedComment = {};
            $http
                .get('/api/forum/comment/'+post._id)
                .success(function (response) {
                    $scope.receivedComment = response;
                    for(var i=0;i<$scope.receivedComment.length;i++){
                        $scope.records.push([$scope.receivedComment[i].comment, $scope.receivedComment[i].postDate,$scope.receivedComment[i].username]);
                    }
                });
        }
    }]);
