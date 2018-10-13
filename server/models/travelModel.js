'use strict';

// This model is for adding the Destinations of User.

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var TravelSchema= new Schema({
    country: String,
    city: String,
    traveldate: String,
    username: String

});
var TravelModel=mongoose.model('travel', TravelSchema);
// This model is used to transfer data from node to mongoDB.

module.exports= TravelModel;

