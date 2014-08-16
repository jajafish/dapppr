var request  = require('request');

request({
    uri: "http://api.dribbble.com/players/simplebits/shots",
    method: "GET",
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10,
}, function(err, response, body){

    var dribbleUserShots = JSON.parse(body);
    console.log(dribbleUserShots);

});