exports.getDribbbleDataForUser = function(callback) {

    var request  = require('request');

    request({
        uri: "http://api.dribbble.com/players/KendrickKidd/shots",
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

        for (var i = 0; i < 14; i++) {

            var shotObject = {
                imageName: dribbbleUserShots[i].title,
                image_url: dribbbleUserShots[i].image_url,
                likes: dribbbleUserShots[i].likes_count
            };

            dribbbleUser.shots.push(shotObject);

        }

        console.log(dribbbleUser);
        callback(null, dribbbleUser);

    });

};


