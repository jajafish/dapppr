var dribbbleAPI = require('../apiRequests/dribbbleService');

exports.sayHello = function (req, res) {

    dribbbleAPI.getDribbbleDataForUser(function(err, dData){
        res.header('content-type', 'text/html');
        res.send(dData);
    });

};
