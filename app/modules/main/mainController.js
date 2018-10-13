'use strict';

angular.module('app')
    .controller('mainController', ['$rootScope','$scope','$http','$state','$window', '$location', function ($rootScope,$scope,$http,$state,$window, $location ) {
    //Login-User Authentication
        /*$http.get('/api/countries').then(function (response) {
            console.log(response.data)

        })*/
        $rootScope.logout = function () {
        $window.sessionStorage.removeItem('token');
        $window.sessionStorage.removeItem('user');
            $state.go('login');
    }

}])
