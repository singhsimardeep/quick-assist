'use strict';
angular.module('app')
    .controller('userController', ['$scope','$http','$state','$window', '$location', function ($scope,$http,$state,$window, $location ) {
        //Login-User Authentication
        var user= $window.sessionStorage.getItem('user')
        $scope.getUser = function () {
            $http.get('/api/user/'+user).then(function (response) {
                    $scope.user = response.data;
                    console.log(response);
                }
            ).catch(
                function (response)
                {
                    console.log("error");

                }
            )
        }

        $scope.getUser();

        $scope.updateUser = function () {
            $http.post('/api/user',$scope.user).then(function (response) {
                    alert("Update Successful")
                $state.go("home")
                }
            ).catch(
                function (response)
                {
                    console.log("error");

                }
            )
        }




    }]);