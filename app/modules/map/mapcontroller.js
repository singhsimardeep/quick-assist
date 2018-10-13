//Following module is for google maps for displaying the map, showing the current user marker, infowindow, getting the users and displaying them
// through marker. Also users are displayed according to the selected radius.
'use strict';

angular.module('app')
    .controller('mapController', ['$scope','$http','$state', function ($scope,$http,$state ) {
        //To get the current position of the device through google API
        navigator.geolocation.getCurrentPosition(function(position) {
           //Here we are getting current latitudes and longitudes
            var currentlocat = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            //Mapped the map with id and set its center to current location
            var map = new google.maps.Map(document.getElementById('map'), {
                center: currentlocat,
                zoom: 12,
            });

            //Below are details for Infowindow for Current User.
            var contentString = 'Whoah!! I found myself !!';
            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            //Marker for Current User
            var marker = new google.maps.Marker({
                position: currentlocat,
                map: map,
                title: 'Yeah!! I am here!!'
            });

            //Added bounce functionality on mouse click
            google.maps.event.addListener(map, 'idle', function () {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            });

            //Added listener to marker
            marker.addListener('click', function() {
                Bounce();
                infowindow.open(map, marker);
            });

            google.maps.event.addListener(marker, 'click', function () {
                Bounce();
                setTimeout(Bounce, 4000);
            });

            //Bounce function which sets bounce
            function Bounce() {
                if (marker.getAnimation() !== null) {
                    marker.setAnimation(null);
                } else {
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                }}

            //Showed the circle for the current location of the user
            var circle = new google.maps.Circle({
                map: map,
                clickable: false,
                radius: 5000,
                strokeColor: '#313131',
                strokeOpacity: .8,
                fillColor: '#fff',
                fillOpacity: .4

            });

            // Linking circle to the marker
            circle.bindTo('center', marker, 'position');

        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
        $scope.gotomap = function () {
            $state.go('map');
        }

        $scope.records = {};

        $scope.mapusers = function () {
            //Mapped map to get users below
            navigator.geolocation.getCurrentPosition(function(position) {
                var currentlocat = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    radius: parseInt(document.getElementById('radius').value, 10)
                };


                $http.post('/api/map',currentlocat).then(function (response) {
                    $scope.records = response.data;
                    navigator.geolocation.getCurrentPosition(function(position) {
                        var current = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        var map = new google.maps.Map(document.getElementById('map'), {
                            center: current,
                            zoom: 11
                        });

                        var marker = new google.maps.Marker({
                            map: map,
                            position: current,
                            zoom: 11
                        });

                        var radius = parseInt(document.getElementById('radius').value, 10);
                        var radiuscircle = radius*1000;
                        var circle = new google.maps.Circle({
                            map: map,
                            clickable: false,
                            radius: radiuscircle,
                            fillColor: '#fff',
                            fillOpacity: .6,
                            strokeColor: '#313131',
                            strokeOpacity: .4
                        });

                        //binding the circle to the marker
                        circle.bindTo('center', marker, 'position');
                        var contentString = 'You are here';
                        var infoWindow = new google.maps.InfoWindow({
                            content: contentString
                        });

                        marker.addListener('click', function () {
                            Bounce();
                            infoWindow.open(map,marker);
                        });
                        google.maps.event.addListener(marker, 'click', function () {
                            Bounce();
                            infoWindow.open(map,marker);
                            setTimeout(Bounce, 4000);
                        });

                        function Bounce() {
                            if (marker.getAnimation() !== null) {
                                marker.setAnimation(null);
                            } else {
                                marker.setAnimation(google.maps.Animation.BOUNCE);
                            }}

                            for (var i = 0; i < response.data.length; i++) {

                            //below calculated Age which we are displaying on the infowindow of the marker
                            var dateString = response.data[i].dateofbirth;
                            var dates = dateString.split("-");
                            var d = new Date();

                            var useryear = dates[0];
                            var usermonth = dates[1];
                            var userday = dates[2];

                            var currentday = d.getDate();
                            var currentmonth = d.getMonth() + 1;
                            var currentyear = d.getFullYear();

                            var age = currentyear - useryear;

                            if ((currentmonth == usermonth) || ( (currentmonth < usermonth) && currentday < userday   )) {
                                age--;
                            }
                            var positioncurrent = {
                                lat: parseFloat(response.data[i].latitude),
                                lng: parseFloat(response.data[i].longitude)
                            };
                            createNewMarker(i);
                        }
                        //Created marker
                        function createNewMarker(i) {

                            var marker = new google.maps.Marker({
                                map: map,
                                position: positioncurrent,
                                title: response.data[i].firstname + " " + response.data[i].lastname,
                                icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                            });

                            //Showing content on infowindow
                            var contentString = '<div><strong>Name: ' + response.data[i].firstname + '</strong><br>' + 'Age: ' + age + '<br>' + '</div>';
                            var infoWindows = new google.maps.InfoWindow({
                                content: contentString,
                                position: positioncurrent
                            });
                                //This event will run on click of the marker
                                marker.addListener('click', function () {
                                infoWindows.open(map,marker);
                            });
                        }

                    });

                });
            });
        };


    }]);
