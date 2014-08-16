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

        var dribbbleUser = {
            userName: dribbbleUserShots[0].player.name,
            userFollowers: dribbbleUserShots[0].player.followers_count,
            userLikes: dribbbleUserShots[0].player.likes_received_count,
            portfolioURL: dribbbleUserShots[0].player.url,
            avatarURL: dribbbleUserShots[0].player.avatar_url,
            rawArtwork: []
        };


        var PNGREGEX = /\.(png)\b/;

        for (var i = 0; i < 14; i++) {

            var currentImageUrl = dribbbleUserShots[i].image_url;

            if (PNGREGEX.exec(currentImageUrl)) {

                var shotObject = {
                    imageName: dribbbleUserShots[i].title,
                    image_url: dribbbleUserShots[i].image_url,
                    likes: dribbbleUserShots[i].likes_count
                };

                dribbbleUser.rawArtwork.push(shotObject);
            }

        }

        console.log(dribbbleUser);

        var userInstance = new User();

        userInstance.userName = dribbbleUser.userName;
        userInstance.userFollowers = dribbbleUser.userFollowers;
        userInstance.userLikes = dribbbleUser.userLikes;
        userInstance.portfolioURL = dribbbleUser.portfolioURL;
        userInstance.avatar_url = dribbbleUser.avatar_url;
        userInstance.rawArtwork = dribbbleUser.rawArtwork;

        userInstance.save(function(err, data, numberAffected){
            if (err) {
                res.render("error", {err: err});
            }
            else {
                var id = data._id;
                console.log(dribbbleUser);
                res.header('content-type', 'text/html');
                res.render('myProducts', {
                    user: dribbbleUser
                });
            }
        });


    });


};






