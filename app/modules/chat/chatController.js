'use strict';

angular.module('app')
    .controller('chatController', ['socket','$rootScope','$scope','$http','$state','$window', '$location', function (socket,$rootScope,$scope,$http,$state,$window, $location ) {
        var privateRecMsgs=[]

        $scope.sendmessage = function (uname,message) {
            socket.emit('privatemessage', {msg:message,uname:uname});
        }
        // receiving from client and emmiting message
        $scope.sendpublicmessage = function (message) {
            socket.emit('publicmessage', {msg:message});

        }

        socket.on('getUsers', function(data){
            $scope.connectedUsers=data;

        })

        socket.on('receivemessage', function(data){

            privateRecMsgs.push([data.message,data.user])
            $scope.recmessage= privateRecMsgs
        })
        socket.on('getCount', function(data){
            console.log("Users Count: "+data)
        })
        socket.on('logoutUser', function(){
            $rootScope.logout();
        })


    }])
