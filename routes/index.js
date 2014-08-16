var dribbbleAPI = require('../apiRequests/dribbbleService');

exports.signUpPage = function (req, res) {

    res.render('signup');

};

exports.postUserName = function (req, res) {

    var username = req.body.dribbbleUserName;

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
            shots: []
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

                dribbbleUser.shots.push(shotObject);
            }

        }

        req.user = dribbbleUser;

        res.header('content-type', 'text/html');
        res.render('myproducts', {
            user: dribbbleUser,
            username: username
        });


    });


};


// exports.myProducts = function (req, res) {
//
//     res.render('myproducts', {
//     });
//
// };
