'use strict';

    angular.module('app', ['ui.router','ngFileUpload'])
        .config(['$stateProvider','$urlRouterProvider','$httpProvider',function($stateProvider, $urlRouterProvider,$httpProvider) {

            $urlRouterProvider.otherwise('/login');
            $httpProvider.interceptors.push('authInterceptor');

            // State declaration
            $stateProvider
            .state('home', {

                url: '/welcome',
                templateUrl: '/app/views/main.html',
                controller: 'mainController'
            })
            .state('login', {

                url: '/login',
                templateUrl: '/app/views/login.html',
                controller: 'loginController'
            })
             .state('map', {
                url: '/map',
                templateUrl: '/app/views/mapview.html',
                controller: 'mapController'
             })
                .state('postClassified', {
                    url: '/postClassified',
                    templateUrl: '/app/views/postClassifieds.html',
                    controller: 'classifiedController'
                })

                .state('viewClassified', {
                    url: '/viewClassified',
                    templateUrl: '/app/views/viewClassifieds.html',
                    controller: 'classifiedController'
                })

                .state('travel', {
                url: '/travel',
                templateUrl: '/app/views/Travel_Insight.html',
                controller: 'travelinsightcontroller'
            })

                .state('forum', {

                    url: '/forum',
                    templateUrl: '/app/views/forum.html',
                    controller: 'forumController'
                })
                .state('forumPage', {

                    url: '/forumPage',
                    templateUrl: '/app/views/forumPage.html',
                    controller: 'forumController'
                })
				
				.state('addTravel', {
                    url: '/addTravel',
                    templateUrl: '/app/views/addTravelInsight.html',
                    controller: 'travelinsightcontroller'

                })

                .state('viewTravel', {
                    url: '/viewTravel',
                    templateUrl: '/app/views/viewTravelInsight.html',
                    controller: 'travelinsightcontroller'
                })
                .state('settings', {
                    url: '/settings',
                    templateUrl: '/app/views/editForm.html'
                })
                .state('forgotpassword', {
                    url: '/forgotpassword',
                    templateUrl: '/app/views/forgotPassword.html',
                    controller: 'forgotPassword'
                })
                .state('chat', {
                    url: '/chat',
                    templateUrl: '/app/views/chat.html',
                    controller: 'chatController'
                })

                .state('editForm', {
                    url: '/editForm',
                    templateUrl: '/app/views/editForm.html',
                    controller: 'userController'
                })
                .state('useprofile1', {

                    url: '/useprofile1',
                    templateUrl: '/app/views/useprofile1.html',
                    controller: 'userController'
                })
                .state('changePassword', {

                    url: '/changePassword',
                    templateUrl: '/app/views/changePassword.html',
                    controller: 'changePassword'
                })
    }])
        .run(['$rootScope','$location','$window','$state',function($rootScope,$location,$window,$state){
            $rootScope.$on('$stateChangeStart', function(event, toState){

                // To intercept UI calls for token
                var login = $window.sessionStorage.getItem('token');
                $rootScope.userlogin=$window.sessionStorage.getItem('user');
                if(!login){
                    $rootScope.checkAuth = false;
                }else{
                    $rootScope.checkAuth = true;
                }

                if(!login && toState.name !="login"){
                    $location.path('/login');
                }
                else if(login && toState.name =="login"){
                    $location.path('/welcome');
                }
            })
        }]).factory('socket', function ($rootScope,$window) {

            // Socket Connection
                var socket = io("http://localhost:5001/",{ query: {userConnected :$window.sessionStorage.getItem('user')} }).connect();
                return {
                    on: function (eventName, callback) {
                        socket.on(eventName, function () {

                            var args = arguments;
                            $rootScope.$apply(function () {
                                callback.apply(socket, args);
                            });
                        });
                    },
                    emit: function (eventName, data, callback) {
                        socket.emit(eventName, data, function () {
                            var args = arguments;
                            $rootScope.$apply(function () {
                                if (callback) {
                                    callback.apply(socket, args);
                                }
                            });
                        })
                    }
                };
})
        .factory('authInterceptor',['$window', function($window){
            // Add token to request header
                return {
                    request: function(config){
                        var token = $window.sessionStorage.getItem('token');
                        if(token){
                            config.headers = config.headers || {};
                            config.headers['x-access-token'] = token;
                        }
                        return config;
                    }

                };
}]);