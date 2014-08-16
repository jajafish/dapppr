var dribbbleAPI = require('../apiRequests/dribbbleService');

exports.signUpPage = function (req, res) {

    res.render('signup');

};

exports.takeUserName = function (req, res) {

    // console.log(req.params);

    // dribbbleAPI.getDribbbleDataForUser(function(err, dData){
    //     res.redirect('myproducts');
    // });

};