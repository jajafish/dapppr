var express                 = require('express'),
    routes                  = require("./routes"),
    app                     = express(),
    server                  = require("http").createServer(app),
    bodyParser              = require("body-parser"),
    http                    = require('http'),
    mongo                   = require('mongodb'),
    db = new mongo.Db('mydb', new mongo.Server("127.0.0.1", 27017, {}), {}),
    config                  = require('config'),
    utils                   = require('./lib/utils'),
    request                 = require('request'),
    fs                      = require('fs'),
    util                    = require('util'),
    mime                    = require('mime');




app.set('port', 3000);
server.listen(3000);

app.use(express.static(__dirname + "/public"));
app.use(bodyParser());
app.use(bodyParser.json());

// app.use(function (req, res, next){
//     console.log(req.body);
//     next();
// });

// SIGNUP WITH DRIBBBLE ACCOUNT
// app.get('/', routes.signUpPage);

// app.post('/', routes.postUserName);

// EDIT SHIRT
// app.get('/editShirt', routes.editProduct);

// SHOW USER PRODUCTS PAGE
// app.get('/:userId', routes.showUserProductsPage);

app.get('/testkang', function (req, res) {
   
    request.get({url: 'https://d13yacurqjgara.cloudfront.net/users/44490/screenshots/1248634/kangaroorunappgameicon.png', encoding: 'binary'}, function (err, response, body) {
        if (err) return;

        var binaryKangPNG = body;
        console.log(binaryKangPNG);

        db.open(function(err, db) {
            db.collection('users', function(err, collection) {
                doc = {
                    "kangPNGFile" : binaryKangPNG
                };
                collection.insert(doc, function() {
                    db.close();
                });
            });
        });

    });

});

app.get('/showAlienImage', function (req, res){


    db.open(function(err, db){
        db.collection.find(), function(err, docs){
            console.log(docs);
        };

    });



    // db.open(function(err, db){
    //     db.collection('users', function(err, collection){
    //         collection.find({"_id" : "53efe09a531bd30f23afb430"}, function(err, docs) {
    //             console.log(docs).toArray();
    //         });
    //     });
    // });

    // // console.log(alienImage);

});


app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', {layout: true});
