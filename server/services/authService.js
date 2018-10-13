var UserModel= require('../models/usermodel');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
    exports.authenticate = function (req, res) {

    // find the user
    UserModel.findOne({
        "username" : req.body.username
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            // check if password matches
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
				// create token

                const payload = {
                    username: user.username
                };
                var token = jwt.sign(payload, "secret",{ expiresIn: '1h' });
              //  req.session.user = user;
                // return the information including token as JSON
                res.json({
                    success: true,
                    token: token
                });
            }
        }
    });
}
exports.middleware=function(req, res, next) {

    // check token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decrypt token
    if (token) {

        jwt.verify(token, 'secret', function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
};