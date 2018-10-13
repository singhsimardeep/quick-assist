'use strict';
angular.module('app')
    .controller('travelinsightcontroller', ['$rootScope','$scope','$http','$state','$window', function ($rootScope,$scope,$http,$state,$window ) {

        /*Travel Insight: This module is for adding the destinations of User and showing the Visited places of User
         basis on the functions which are add() and insight().
        */

        // The add function is getting the data from addTravelInsight html page fields and send it to Server.

        $scope.add = function () {
        var user= $window.sessionStorage.getItem('user')

            // The user variable is just storing the UserName basis on Session/logged in user.

            $scope.travel.username = user;

        $http.post('/api/addTravel', $scope.travel).then(function (response)
            {
                $state.go("viewTravel")
                    
            }
        ).catch(
            function (response)
            {
                console.log("error");

            }
        )
    };
         /* The insight function is fetching the data with city, tdate and month variables
          from back-end and  for showing it to Chart.*/

        $scope.insight = function () {
          var user= $window.sessionStorage.getItem('user')

            // This user variable is just storing the UserName basis on Session/logged in user.

            $http.get('/api/viewTravel/'+user).then(function (response)
                {
                    var resdata=response.data;
                    var i=0;

                    var city ={}
                    var tdate = [];
                    var count =0;
                    var month ={
                        jan:0, feb:0, mar:0, apr:0, may:0, jun:0, july:0, aug:0, sep:0, oct:0, nov:0,  dec:0
                               }
                    var tavelCity = {jan: [],feb: [],mar: [],apr: [],may: [],jun: [],july: [],aug: [],sep: [],
                                     oct: [],nov: [],dec: []}


                    while(i<Object.keys(resdata).length){
                        city[i] = resdata[i].city
                        tdate[i] = resdata[i].traveldate
                        var from =tdate[i].split("-");

                        if (from[1]==1){
                            tavelCity.jan.push(resdata[i].city)
                            month.jan++
                        }
                        if (from[1]==2){
                            tavelCity.feb.push(resdata[i].city)
                            month.feb ++
                        }
                        if (from[1]==3){
                            tavelCity.mar.push(resdata[i].city)
                            month.mar ++
                        }
                        if (from[1]==4){
                            tavelCity.apr.push(resdata[i].city)
                            month.apr ++
                        }
                        if (from[1]==5){
                            tavelCity.may.push(resdata[i].city)
                            month.may ++
                        }
                        if (from[1]==6){
                            tavelCity.jun.push(resdata[i].city)
                            month.june ++
                        }
                        if (from[1]==7){
                            tavelCity.july.push(resdata[i].city)
                            month.july ++
                        }
                        if (from[1]==8){
                            tavelCity.aug.push(resdata[i].city)
                            month.aug ++
                        }
                        if (from[1]==9){
                            tavelCity.sep.push(resdata[i].city)
                            month.sep ++
                        }
                        if (from[1]==10){
                            tavelCity.oct.push(resdata[i].city)
                            month.oct ++
                        }if (from[1]==11){
                            tavelCity.nov.push(resdata[i].city)
                            month.nov ++
                        }
                        if (from[1]==12){
                            tavelCity.dec.push(resdata[i].city)
                            month.dec ++
                        }
                            i++

                    }


                    $scope.travelledCity=resdata;


                    $scope.month=month
                    var chartData ={}

                    //The Bar chart is showing the number of travelled cities of User.

                    $scope.myChart = document.getElementById('myChart').getContext('2d');
                    Chart.defaults.scale.ticks.beginAtZero = true;
                    var barchart = new Chart(myChart,{
                        type:'bar',
                        data:{
                            labels:['January','February','March','April','May','June','July','August','September','October','November','December'],
                            datasets:[{
                                label:'Total Travelled Cities',
                                data:[month.jan,
                                          month.feb,month.mar,month.apr,month.may,month.jun,
                                          month.july,month.aug,month.sep,month.oct,month.nov,month.dec],

                                backgroundColor:['Red','Yellow','Black','Purple','Orange','Brown','Green',
                                                 'Red','Yellow','Black','Orange','Green'

                                                ]

                                    }]
                           },
                            options:{
                               title:{
                                display:true,
                                text:'Monthly Travelled Cities',
                                fontSize:25
                            },

                            legend:{
                                position:'right',
                                display:false
                            },

                            layout:{
                                padding:{
                                    left:50,
                                    right:0,
                                    bottom:0,
                                    top:0
                                }
                            },

                            tooltips:{
                                enabled:true

                            },


                        }


                    });

                }
            )
                .catch(
                function (response)
                {
                    console.log("Problem occurs in Chart or Data");

                }
            )
        };

    
}]);
