'use strict';
angular.module('app')
    .controller('loginController', ['$rootScope','$scope','$http','$state','$window', '$location', function ($rootScope,$scope,$http,$state,$window, $location) {
    //Login-User Authentication

        // Authenticate user using post to server
        $scope.login = function () {
        $http.post('/api/authenticate', $scope.user).then(function (response) {
            if (response.data.token){
                $window.sessionStorage.setItem('token', response.data.token);
                $window.sessionStorage.setItem('user', $scope.user.username);
                $state.go('home');
            }
            else{
                alert('Please enter valid credentials')
            }
            }
        ).catch(
            function (response)
            {
                $window.sessionStorage.removeItem('token');
                $window.sessionStorage.removeItem('user');
                console.log("error");
            }
        )
    }

    // Verifying if user already exists
    $scope.verifyuser = function () {
        $http.post('/api/checkuser', $scope.user).then(function (response){
            //exists then alert and clear the field
            if (response.data == 'true')
            {
                alert('username exists')
                $scope.user.username ="";
                return false

            }
            else if (response.data == 'false')
                return true

        })
    }

    // signup function that serves the form data to backend
    $scope.signup = function () {
          // Saving longitutude and latitude at run time based on pincode and countrzy
            var googelgeocoder = new google.maps.Geocoder();
            var address = $scope.user.pincode +" "+$scope.user.country;
            googelgeocoder.geocode( { 'address': address }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {

                    $scope.user.lat = results[0].geometry.location.lat();
                    $scope.user.lng = results[0].geometry.location.lng();

                    // data is sent to api using http and user is pased in the scope
                    $http.post('/api/signup', $scope.user).then(function (response)
                        {
                            console.log(response.data);
                            $("#login-form").delay(100).fadeIn(100);
                            $("#register-form").fadeOut(100);
                        }
                    ).catch(
                        function (response)
                        {
                            console.log("error");
                        }
                    );
                }else {
                    alert("Not able to Geocode as: " + status);
                }
            });
        }
    }]);

/*
*/
