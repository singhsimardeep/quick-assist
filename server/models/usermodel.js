/*User Signup schema created for storing firstname, lastname, email, country, dateofbirth, gender, username, password, pincode,latitude and longitude in database*/
'use strict';

// This Defines the User Signup schema
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema= new Schema({
    firstname: String,
    lastname: String,
    email: String,
    country: String,
    dateofbirth: String,
    gender: String,
    username: {type : String , unique : true, required : true, dropDups: true},
    password: String,
    pinCode: String,
    latitude: String,
    longitude: String

});
var UserModel=mongoose.model('user', UserSchema);

module.exports= UserModel;
