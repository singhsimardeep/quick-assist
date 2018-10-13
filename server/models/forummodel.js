/*Forum schema created for storing title , body ,posted by , comment and username in database using mongoDB*/
'use strict';

// This Defines the discussion forum schema
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var ForumSchema= new Schema({
//Define schema
    title: String,
    body: String,
    posted: {type: Date},
    comment: String,
    username:String

});

var ForumModel=mongoose.model('post', ForumSchema);
module.exports= ForumModel;
