var dribbbleAPI = require('../apiRequests/dribbbleService');
var mongoose = require('mongoose');


exports.signUpPage = function (req, res) {

    res.render('signup');

};

exports.postUserName = function (req, res) {

    var User = mongoose.model('User');

    var username = req.body.dribbbleUserName;
    console.log("from the dribbble service the username is " +username);

    var request  = require('request');

    request({
        uri: "http://api.dribbble.com/players/"+username+"/shots",
        method: "GET",
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10,
    }, function(err, response, body){

        var dribbbleUserResponse = JSON.parse(body);
        var dribbbleUserShots = dribbbleUserResponse.shots;
        var rawArtwork = [];

        var PNGREGEX = /\.(png)\b/;

        for (var i = 0; i < 14; i++) {

            var currentImageUrl = dribbbleUserShots[i].image_url;

            if (PNGREGEX.exec(currentImageUrl)) {

                var shotObject = {
                    imageName: dribbbleUserShots[i].title,
                    image_url: dribbbleUserShots[i].image_url,
                    likes: dribbbleUserShots[i].likes_count
                };

                rawArtwork.push(shotObject);
            }

        }

        var userInstance = new User();
        userInstance.name = dribbbleUserShots[0].player.name;
        userInstance.userFollowers = dribbbleUserShots[0].player.followers_count;
        userInstance.userLikes = dribbbleUserShots[0].player.likes_received_count;
        userInstance.portfolioURL = dribbbleUserShots[0].player.url;
        userInstance.avatar_url = dribbbleUserShots[0].player.avatar_url;
        userInstance.rawArtwork = rawArtwork;

        userInstance.save(function(err, data, numberAffected){
            if (err) {
                res.render("error", {err: err});
            }
            else {
                var id = data._id;
                res.header('content-type', 'text/html');
                res.redirect('/' +id);
            }
        });

    });

};

exports.showUserProductsPage = function (req, res) {

    var User = mongoose.model('User');
    var id = req.params.userId;
    User.findOne({"_id" : id}, function(err, data){
        console.log(id);

        res.json(data);
        // if (err){
        //     res.send("error man");
        // } else {
        //     console.log(data);
        //     res.render('myproducts', {
        //         user: data 
        //     });
        // }
    });


};