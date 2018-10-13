
var UserModel= require('../models/usermodel');
var tarun = require('../../app/scripts/countries.json')

exports.findUser = function (req, res) {
    UserModel.findOne({"username" : req.body.username, "password" : req.body.password},function (err, user) {
        if(user==null){
            console.log("user not found")
            return res.send(false)
        }
        if(user!=null){
            console.log("user found")
            return res.send(true)
        }
    })
};

exports.getUser = function (req,res) {
    UserModel.findOne({"username" : req.params.user} ,function (err, user) {
        if(user==null){
            console.log("user not found")

            return res.send(false);
        }
        if(user!=null){
            return res.send(user);
        }
    })
}
exports.updateUser = function (req, res) {
    console.log(req.body)
    UserModel.update({"_id":req.body._id},{

        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        country: req.body.country,
        dateofbirth: req.body.dateofbirth,
        pinCode : req.body.pincode,
    }).then(
        function (status) {
            res.sendStatus(200);
        },
        function (err) {
            res.sendStatus(400);
        }
    );
};

// service is used to get user from database if user is present or not
exports.check =function (req, res) {

    UserModel.findOne({username : req.body.username},function (err, user) {
        if(user)
        {
        return res.send(true)
        }
        else{
         return res.send(false)
        }
    })
}
// service is used to store the user data into mongodb  
exports.register = function (req, res) {
    var login= new UserModel({
        firstname: req.body.first,
        lastname: req.body.last,
        email: req.body.email,
        country: req.body.country,
        dateofbirth: req.body.dob,
        gender: req.body.gender,
        username: req.body.username,
        password: req.body.password,
        pinCode : req.body.pincode,
        latitude: req.body.lat,
        longitude: req.body.lng
    });
    login.save();
    return res.send({
    });
  res.send(true);

};
exports.countries = function (req, res) {
    return res.send(tarun.Country)
};

exports.forgotPassword = function (req, res) {
    UserModel.findOne({"username" : req.body.username, "email" : req.body.email, "dateofbirth": req.body.dob},function (err, user) {
        if(user==null){
            console.log("user not found")
            return res.send(false)
        }
        if(user!=null){
            console.log("user found")
            return res.send(true)
        }
    })
};
exports.updatePassword = function (req, res) {
    UserModel
        .update({"username" : req.body.username},{
            "password": req.body.password,
        })
        .then(
            function (status) {
                res.sendStatus(200);
            },
            function (err) {
                res.sendStatus(400);
            }
        );
};
exports.changePassword = function (req, res) {
    UserModel
        .update({"username": req.body.username ,"password" : req.body.oldpassword},{
            "password": req.body.newpassword,
        })
        .then(
            function (status) {
                res.sendStatus(200);
            },
            function (err) {
                res.sendStatus(400);
            }
        );
};
