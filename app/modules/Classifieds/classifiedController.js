'use strict';
angular.module('app')
    .controller('classifiedController', ['$scope', 'Upload', '$timeout', '$http','$state', function ($scope, Upload, $timeout, $http, $state) {

        // this checkerror function will focus on date validation entered by user
        $scope.checkErr = function(from,to) {
                $scope.errMessage = '';
                var curDate = new Date();
               // this will validate that end should be greater than start date
                if(new Date(from) > new Date(to))
                {
                    $scope.errMessage = 'End Date should be greater than start date';
                    return false;
                }
            // this will compare the from field to today so that it should not be before today
                if(new Date(from) < curDate)
                {
                    $scope.errMessage = 'Start date should not be before today.';
                    return false;
                }
            };

    // this function will send the form data to the api mentioned in the code
    $scope.uploadPic = function(file) {
        file.upload = Upload.upload({
            url: '/api/upload',
            data: {title: $scope.title, type: $scope.type, description: $scope.description, country: $scope.country, street: $scope.street,
                post: $scope.post, phone:$scope.phone, email: $scope.email ,price: $scope.price, from: $scope.from, to: $scope.to,
                file: file}
        });
        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
                $state.go('home');
            });
        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        });
    }

    // this function will receive the data from backend and serve the response to html page
    $scope.view =function () {

        $http.get('/api/view/classified').then(function (respon)
            {
                $scope.classified= respon.data;

                console.log("Got the data ");
                console.log($scope.classified);

            }
        ).catch(
            function (respon)
            {
                console.log("error");
            }
        );
    };

    }]);