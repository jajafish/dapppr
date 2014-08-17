var express                 = require('express'),
    routes                  = require("./routes"),
    app                     = express(),
    server                  = require("http").createServer(app),
    bodyParser              = require("body-parser"),
    http                    = require('http'),
    mongo                   = require('mongodb'),
    // db                      = require('./lib/db'),
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



app.get('/hello', function (req, res){

var uri = 'mongodb://johnnyJones:pingpong1@ds063449.mongolab.com:63449/dapppr';
mongo.MongoClient.connect(uri, {server: {auto_reconnect: true}}, function (err, db){


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
