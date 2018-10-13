//Service to handle requests from client. Calculates distance based on latitude and longitude of current location and for points where
//user is located. Also we are fetching user data from database.
var UserModel= require('../models/usermodel');

exports.googleUser = function (req, res) {
    var lat_cur = req.body.lat;
    var lng_cur = req.body.lng;
    var radius = req.body.radius;

    //function to calculate distance
    function distancefunc(lat1,lon1,lat2,lon2) {
        var R = 6371; //Earth radius
        var latdist = funcd2r(lat2-lat1);
        var lngdist = funcd2r(lon2-lon1);
        var a =
            Math.sin(latdist/2) * Math.sin(latdist/2) +
            Math.cos(funcd2r(lat1)) * Math.cos(funcd2r(lat2)) *
            Math.sin(lngdist/2) * Math.sin(lngdist/2)
        ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c; // Distance in km
        return d;
    }
    //This function returns distance
    function funcd2r(deg) {
        return deg * (Math.PI/180)
    }

    UserModel.find({}).then(function (user) {
        //created a users array
        var users = [];

        //For all users which satisfy our criteria for the radius which user selected, are getting fetched from database and will be shown.
        user.forEach(function (user) {
            if(typeof(user.latitude) != 'undefined' && distancefunc(lat_cur,lng_cur,user.latitude,user.longitude )<= radius ){
                distancefunc(lat_cur,lng_cur,user.latitude,user.longitude )
                //added all user to users array, which satisfy the criteria
                users.push(user);
            }
        });
        res.send(users);

    });


};
