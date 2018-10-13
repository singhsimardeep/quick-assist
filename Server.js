var express = require("express");
var app = express();

var router = express.Router();
var fs =require('fs');

var path = require('path');
var multer = require('multer');
var bodyParser = require('body-parser');
// Service Instances
var loginService=require('./server/services/loginService');
var classifiedService=require('./server/services/classifiedService');
var googleMaps = require('./server/services/googlemaps');
var authService =require('./server/services/authService');
var travelInsightService =require('./server/services/travelinsightService');
var forumService=require('./server/services/forumService');
var UserModel= require('./server/models/usermodel.js');
var ClassifiedModel= require('./server/models/classifiedModel.js');
var TravelModel= require('./server/models/travelModel.js');

// Mongo DB initiation
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/quickassist");

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

app.use('/app', express.static(__dirname + '/app'));

var server=app.listen(5001,function () {
    console.log("Application is Started Successfuly on 5001")
})

app.get('/',function (req,res) {
    res.sendFile(__dirname +'/Index.html')
})

var io = require('socket.io').listen(server)

var chat = require('./server/services/chat.js')

// API routing without interception
app.route('/api/signup').post(loginService.register);
app.route('/api/checkuser').post(loginService.check)
app.route('/api/forgot').post(loginService.forgotPassword)
app.route('/api/updatepass').post(loginService.updatePassword)
router.route('/authenticate').post(authService.authenticate);

// Middleware to intercept API
router.use(authService.middleware);

// API routing with Interception
router.route('/login').post(loginService.findUser);
router.route('/map').post(googleMaps.googleUser);
router.route('/user/:user').get(loginService.getUser);
router.route('/user').post(loginService.updateUser);
router.route('/changepass').post(loginService.changePassword);
router.route('/upload').post(classifiedService.post);
router.route('/view/classified').get(classifiedService.view);
router.route('/forum').post(forumService.createPost)
router.route('/forum').get(forumService.getall);
router.route('/forum/:id').delete(forumService.deletepost);
router.route('/forum/:id').get(forumService.edit);
router.route('/forum').put(forumService.updatePost);
router.route('/forum/comment').post(forumService.comment);
router.route('/forum/comment/:id').get(forumService.getComments)
router.route('/addTravel').post(travelInsightService.add);
router.route('/viewTravel/:user').get(travelInsightService.gett);
router.route('/countries').get(loginService.countries);

app.use('/api', router);
chat.connect(io);