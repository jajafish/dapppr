var dribbbleAPI = require('../apiRequests/dribbbleService');

exports.signUpPage = function (req, res) {

    res.render('signup');

};

exports.postUserName = function (req, res) {

    dribbbleAPI.getDribbbleDataForUser(function(err, username, dData){
        res.header('content-type', 'text/html');
    });

    console.log(req.body.dribbbleUserName);

};
