var dribbbleAPI = require('../apiRequests/dribbbleService');

exports.signUpPage = function (req, res) {

    res.render('signup');

};

exports.postUserName = function (req, res) {

    var username = req.body.dribbbleUserName;
    console.log("from the dribbble service the username is " +username);

    var requestForUserInformation  = require('request');
    requestForUserInformation({
        uri: "http://api.dribbble.com/players/"+username+"/shots",
        method: "GET",
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10,
    }, function(err, response, body){

        console.log(body);

        var dribbbleUserResponse = JSON.parse(body);
        var dribbbleUserShots = dribbbleUserResponse.shots;
        var usersArtWorkURLs = [];


        var PNGREGEX = /\.(png)\b/;

        for (var i = 0; i < 14; i++) {

            var currentImageUrl = dribbbleUserShots[i].image_url;

            if (PNGREGEX.exec(currentImageUrl)) {

                var shotObject = {
                    imageName: dribbbleUserShots[i].title,
                    image_url: dribbbleUserShots[i].image_url,
                    likes: dribbbleUserShots[i].likes_count
                };

                usersArtWorkURLs.push(shotObject);
            }

        }


        mongo.MongoClient.connect(fullMongoURI, {server: {auto_reconnect: true}}, function (err, db){

            db.collection('users', function(err, collection) {
                doc = {
                    "name" : dribbbleUserShots[0].player.name,
                    "userFollowers" : dribbbleUserShots[0].player.followers_count,
                    "userLikes" : dribbbleUserShots[0].player.likes_received_count,
                    "userPortfolioURL" : dribbbleUserShots[0].player.url,
                    "userAvatar_url" : dribbbleUserShots[0].player.avatar_url,
                    "userArtWork" : usersArtWorkURLs
                };

                collection.insert(doc, function() {

                    var id = doc._id;
                    res.header('content-type', 'text/html');
                    res.redirect('/' +id);

                    db.close();
                });
            });

        });



    });

};

exports.showUserProductsPage = function (req, res) {

    mongo                   = require('mongodb'),
mongoUSER = "johnnyJones:";
mongoPASS = "pingpong1";
mongoROUTE = "mongodb://";
fullMongoURI = mongoROUTE + mongoUSER + mongoPASS + "@ds063449.mongolab.com:63449/dapppr";

    var id = req.params.userId;
    // console.log(id);

    // var BSON = require('mongodb').BSONPure;
    // var obj_id = BSON.ObjectID.createFromHexString(id);

    mongo.MongoClient.connect(fullMongoURI, {server: {auto_reconnect: true}}, function (err, db){
        console.log("THIS IS THE DB: "+db[0]);
        var users = db.collection('users');
        users.find({
            _id: id
        }).toArray(function(err, docs){
            console.log("outer docs: "+docs);

            res.header('content-type', 'text/html');
            res.render('myproducts', {

                user: docs

            });

        });

    });



};


exports.editProduct = function(req, res) {

    res.header('content-type', 'text/html');
    res.render('editProduct', {
        user: data
    });

};