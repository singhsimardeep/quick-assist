'use strict';
angular.module('app')
    .controller('forgotPassword', ['$rootScope','$scope','$http','$state','$window', '$location', function ($rootScope,$scope,$http,$state,$window, $location ) {
        //Login-User Authentication
        $scope.forgot=true;
        $scope.update=false;
        $scope.forgotPassword = function () {
            $http.post('/api/forgot', $scope.user).then(function (response) {
                    if (response.data == "true"){
                        $scope.forgot=false;
                        $scope.update=true
                    }
                    else{
                        alert('Please enter valid credentials')
                    }
                }
            ).catch(
                function (response)
                {
                    console.log("error");

                }
            )
        }
        //
        $scope.updatePassword = function () {
            $http.post('/api/updatepass', $scope.user).then(function (response) {
                    if (response.data){
                        alert('Password Updated')
                        $state.go('login')
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