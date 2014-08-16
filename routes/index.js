var dribbbleAPI = require('../apiRequests/dribbbleService');

exports.sayHello = function (req, res) {

<<<<<<< HEAD
    res.render('signup');

};

exports.takeUserName = function (req, res) {

    // console.log(req.params);

    // dribbbleAPI.getDribbbleDataForUser(function(err, dData){
    //     res.redirect('myproducts');
    // });

};
=======
    dribbbleAPI.getDribbbleDataForUser(function(err, dData){
        res.header('content-type', 'text/html');
        res.send(dData);
    });

};
>>>>>>> parent of 1dbed12... logging username on submit
