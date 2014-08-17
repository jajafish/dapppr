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

        // console.log(body);
        var artist = new Artist();

        var dribbbleUserResponse = JSON.parse(body);
        var dribbbleUserShots = dribbbleUserResponse.shots;
        var usersArtWorkURLs = [];
        var quoteObjects = [];

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

            var design = {
              type: "dtg",
              sides: {
                front: {
                  artwork: usersArtWorkURLs[i].image_url,
                  dimensions: {width: 5}
                }
              }
            };

            var designRequest         = require('request');
            postDesign = function(design){
              designRequest.post('https://api.scalablepress.com/v2/design', {
                'auth': {
                  'user': '',
                  'pass': '2e93f7ea8b4dcd09a0e72df2a7ec0d70'
                },
                json: true,
                body: design
              }, function (err, res, body) {
                // console.log(res.statusCode, body);

                    var quote  = {
                      type: "dtg",
                      designId: body.designId,
                      sides: {front: 1},
                      products: [{
                        id: "anvil-100-cotton-t-shirt",
                        color: "white",
                        size: "lrg",
                        quantity: 1
                      }],
                      address: {
                        name: "Genesis Kim",
                        company: "rsvip",
                        address1: "530 Brannan Street",
                        address2: "Apt 310",
                        city: "San Francisco",
                        state: "California",
                        zip: "94107",
                        country: "US"
                        }
                    };

                    var quoteRequest         = require('request');
                    postQuote = function(quote){
                      quoteRequest.post('https://api.scalablepress.com/v2/quote', {
                        'auth': {
                          'user': '',
                          'pass': '2e93f7ea8b4dcd09a0e72df2a7ec0d70'
                        },
                        json: true,
                        body: quote
                      }, function (err, res, body) {
                        console.log("here is the quote response " +res.statusCode, body);
                        quoteObjects.push(body.orderToken);

                      });
                     
                    };
                    postQuote(quote);
              });
            };
            postDesign(design);

        }

            artist.set('name', dribbbleUserShots[0].player.name);
            artist.set('userFollowers', dribbbleUserShots[0].player.followers_count);
            artist.set('userLikes', dribbbleUserShots[0].player.likes_received_count);
            artist.set('userPortfolioURL', dribbbleUserShots[0].player.url);
            artist.set('avatar_url', dribbbleUserShots[0].player.avatar_url);
            artist.set('userArtWork', usersArtWorkURLs);
            artist.set('artistID', artist.id);

            setTimeout(function(){
                artist.set('quotes', quoteObjects);
                artist.save(null, {
                    success: function(artist) {
                        var artistID = artist.id;
                        // console.log(artistID);
                        res.redirect('/' +artistID);
                    }, error: function(artist, error) {
                        console.log(error.message);
                    }
                });
            }, 5000);

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
          console.log("here is the artist from edit " +artist);
          console.log("artist id is " +artist.id);
          res.render('editProduct', {
              user: artist._serverData
          });

      }
  });

};
