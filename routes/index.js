var dribbbleAPI = require('../apiRequests/dribbbleService');
var queue = require('queue-async');

exports.signUpPage = function (req, res) {
    res.render('signup');
};

exports.postUserName = function (req, res) {
    console.log("from the dribbble service the body is " +req.body);

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

          var artist = new Artist();
            artist.set('name', dribbbleUserShots[0].player.name);
            artist.set('userFollowers', dribbbleUserShots[0].player.followers_count);
            artist.set('userLikes', dribbbleUserShots[0].player.likes_received_count);
            artist.set('userPortfolioURL', dribbbleUserShots[0].player.url);
            artist.set('avatar_url', dribbbleUserShots[0].player.avatar_url);
            artist.set('userArtWork', usersArtWorkURLs);
            artist.set('artistID', artist.id);
            artist.save(null, {
                success: function(artist) {
                    var artistID = artist.id;
                    // console.log(artistID);
                    res.redirect('/' +artistID);
                }, error: function(artist, error) {
                    console.log(error.message);
                }
            });

        });

};

exports.showUserProductsPage = function (req, res) {

    // console.log(req.params);
    var artistID = req.params.userId;

    var colors =
      [{
        'name' : 'Black',
        'background_color': '#0c070b'
      },{
        'name': 'Caribbean',
        'background_color': '#20b4ce'
      }, {
        'name': 'Heather Dark Grey',
        'background_color': '#6f727b'
      }, {
        'name': 'Hot Pink',
        'background_color': '#fe7ca0',
      }, {
        'name': 'Kelly Green',
        'background_color': '#1e9569'
      },{
        'name':'Key Lime',
        'background_color': '#69bc46'
      },{
        'name':'Lemon Zest',
        'background_color': '#ece80b'
      },{
        'name':'Lemon Zest',
        'background_color': '#ece80b'
      },{
        'name':'Navy',
        'background_color': '#14214d'
      },{
        'name':'Neon Blue',
        'background_color': '#2F549A'
      },{
        'name': 'Neon Green',
        'background_color': '#90C593'
      },{
        'name': 'Kiwi',
        'background_color': '#8aa140'
      },{
        'name':'Neon Orange',
         'background_color': '#1f6522'
      },{
        'name': 'Neon Pink',
        'background_color': '#E99EBC'
      },{
        'name': 'Neon Yellow',
        'background_color': '#EEEA84'
      },{
        'name': 'Pool Blue',
        'background_color': '#3BB5CF'
      },{
        'name': 'Red',
        'background_color': '#cc1d44'
      },{
        'name': 'Royal Blue',
        'background_color': '#27488b'
      },{
        'name': 'Storm Grey',
        'background_color': '#326AAE'
      },{
        'name': 'White',
        'background_color': '#f4f4f4'
      }];

    var query = new Parse.Query(Artist);
    query.get(artistID, {
        success: function(artist){
            console.log(artist);
            res.render('myproducts', {
                user: artist._serverData,
                colorObject: colors,
                userID: artist.id
            });

        }
    });

};


exports.editUserProductsPage = function (req, res) {

  var artistID = req.params.userId;

  var query = new Parse.Query(Artist);
  query.get(artistID, {
      success: function(artist){

          res.render('editProduct', {
              user: artist._serverData
          });

      }
  });

};

exports.userSignsPetitionAndSignsUp = function(req, res) {

  console.log("the req is ", req);
  console.log("the body is ", req.body);

  var artistID = req.body.artistID;
  console.log("the artistID is: " + artistID);

  var artistPointer = {
    __type: "Pointer",
    className: "Artist",
    objectId: artistID
  };

  console.log(artistPointer);

  var username = req.body.newUserEmail;
  var password = req.body.newUserPassword;
  console.log(username);

  console.log('signing up user');

  if (req.newUserPassword == req.newUserPasswordConfirm) {
    var user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("userArtist", artistPointer);
    user.signUp(null, {
      success: function(user){

      },
      error: function(user, error){
        console.log("error: " + error.code + " " + error.message);
      }
    });

  } else {
    console.log("passwords must match");
  }

};




















exports.dribbblePetition = function(req, res) {

  var query = new Parse.Query(Parse.User);
  var artist = new Parse.Query(Artist);

  var artistUsers = [];

  var setArtistUsers = function(callback){
    query.find({
      success: function(users){
        for (var i = 0; i < users.length; ++i) {

          var myPointerObject = users[i].get("userArtist");
          console.log('get name ', myPointerObject.id);
          getArtistInfo(myPointerObject.id, callback);
        }
        // gatherArtistUsers(callback);
      }
    });
  };

  var getArtistInfo = function(artistId, callback){
    artist.get(artistId, {
      success: function(artist){
        console.log('artist name is: ', artist._serverData.name);

        var artistObject = {
          name: artist._serverData.name,
          avatar: artist._serverData.avatar_url,
          dribLink: artist._serverData.userPortfolioURL
        };

        artistUsers.push(artistObject);
        gatherArtistUsers(callback);

      }
    });
  }

  var gatherArtistUsers = function(callback){
    console.log("INSIDE CALLBACK")
    if(callback) callback(null, artistUsers);
  };

  queue()
  .defer(setArtistUsers)
  .await(function(err, getArtistUsers) {
    res.render('petitionSigners', {
      users: getArtistUsers
    });
  });

};
