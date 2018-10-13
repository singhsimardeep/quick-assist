'use strict';

// This Defines the discussion forum schema
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var ForumCommentSchema= new Schema({
//Define schema
    id: String,
    username: String,
    comment: String,
    postDate: {type: Date}

});

var ForumCommentModel=mongoose.model('postComment', ForumCommentSchema);

module.exports= ForumCommentModel;
