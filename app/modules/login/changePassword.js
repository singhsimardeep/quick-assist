'use strict';
angular.module('app')
    .controller('changePassword', ['$rootScope','$scope','$http','$state','$window', '$location', function ($rootScope,$scope,$http,$state,$window, $location ) {
        //Login-User Authentication

        $scope.username=$window.sessionStorage.getItem('user');

        $scope.changePassword = function () {
            var user={};
            user.username=$scope.username;
            user.oldpassword=$scope.oldpassword;
            user.newpassword=$scope.password;

            $http.post('/api/changepass', user).then(function (response) {
                    if (response.data){
                        alert('Password Updated')
                        $state.go('home')
                    }
                    else{
                        alert('Cannot reset')
                    }
                }
            ).catch(
                function (response)
                {
                    console.log("error");

                }
            )
        }
    }

    ]);