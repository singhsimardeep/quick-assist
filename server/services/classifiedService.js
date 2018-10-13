// this service is used to post the data to database and retrieve data from database

var ClassifiedModel =require('../models/classifiedModel');
var multer = require('multer');
var fs=require('fs');
var filepath ='';
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'app/img');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        filepath=file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
        cb(null,filepath);
    }
});
// multer assigns the single file to an upload function
var upload = multer({storage: storage }).single('file');

// this service will post the data received from frontend to the database
exports.post =function (req,res) {
    upload(req,res,function(err){
        if(err){
            res.json({error_code:1,err_desc:err});
            return;
        }
        res.json({error_code:0,err_desc:null});
        var imgpath= 'app/img/'+filepath;
        var postclassified= new ClassifiedModel({
            Title : req.body.title,
            Type: req.body.type,
            email:req.body.email,
            Description:req.body.description,
            Country:req.body.country,
            Street:req.body.street,
            PostCode:req.body.post,
            Phone_No: req.body.phone,
            Price: req.body.price,
            From:req.body.from,
            To:req.body.to,
            Image: imgpath

        });
        postclassified.save();
    });
};

// this service will is used to fetch data from databse
exports.view= function(req,res){

    ClassifiedModel.find({}, (function (err, classified) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        res.json(classified);
    }));

}
