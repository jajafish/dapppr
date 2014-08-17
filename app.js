var express                 = require('express'),
    routes                  = require("./routes"),
    app                     = express(),
    server                  = require("http").createServer(app),
    bodyParser              = require("body-parser"),
    http                    = require('http'),
    db                      = require('./lib/db'),
    config                  = require('config'),
    utils                   = require('./lib/utils'),
    request                 = require('request'),
    fs                      = require('fs'),
    util                    = require('util'),
    mime                    = require('mime');
    
mongo                   = require('mongodb'),
mongoUSER = "johnnyJones:";
mongoPASS = "pingpong1";
mongoROUTE = "mongodb://";
fullMongoURI = mongoROUTE + mongoUSER + mongoPASS + "@ds063449.mongolab.com:63449/dapppr";

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
app.get('/', routes.signUpPage);

app.post('/', routes.postUserName);

// EDIT SHIRT
// app.get('/editShirt', routes.editProduct);

// SHOW USER PRODUCTS PAGE
// app.get('/:userId', routes.showUserProductsPage);


app.get('/hello', function (req, res){

    mongo.MongoClient.connect(fullMongoURI, {server: {auto_reconnect: true}}, function (err, db){

        db.collection('phrases', function(err, collection) {
            doc = {
                "hello" : "you"
            };
            collection.insert(doc, function() {
                db.close();
            });
        });


    });

});




app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', {layout: true});
