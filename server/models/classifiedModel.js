'use strict';


var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// schema for classifieds which is used to store the data
var ClassifiedSchema= new Schema({
    Title: String,
    Type: String,
    email: String,
    Description:String,
    Country: String,
    Street: String,
    PostCode: String,
    Phone_No: String,
    Price: String,
    From: String,
    To:String,
    Image:String
});
var ClassifiedModel =mongoose.model('classified', ClassifiedSchema);
// exports the classifiedmodel so that it can be accessed from outside
module.exports= ClassifiedModel;