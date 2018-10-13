
var travelInsight= require('../models/travelModel');


// This service function is getting data from travelinsighcontroller and adding the data into travelInsight Model of User.

exports.add = function (req, res) {
    var add= new travelInsight({
        country: req.body.con,
        city: req.body.cty,
        traveldate: req.body.tra,
        username:req.body.username
    });
    add.save();
    return res.send({
    });
  res.send(true);

};

// This service function is getting data from travelModel (travel collection in DB).
exports.gett= function(req,res){

    travelInsight.find({"username" : req.params.user}, (function (err, travel) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }

        res.json(travel);


    }));

}
