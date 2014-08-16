exports.getDribbbleDataForUser = function(callback) {

    var userImagePNGs = [];

    var request  = require('request');

    request({
        uri: "http://api.dribbble.com/players/simplebits/shots",
        method: "GET",
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10,
    }, function(err, response, body){

        var dribbbleUserResponse = JSON.parse(body);
        var dribbbleUserShots = dribbbleUserResponse.shots;

        // var dribbbleUser = {
        //     userName: dribbbl
        // };

        for (var i = 0; i < 14; i++) {

            var shotObject = {
                imageName: dribbbleUserShots[i].title,
                image_url: dribbbleUserShots[i].image_url,
                likes: dribbbleUserShots[i].likes_count
            };

            userImagePNGs.push(shotObject);

        }



        console.log(userImagePNGs);
        callback(null, userImagePNGs);

    });

};


