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
    
app.use(express.static(__dirname + "/public"));
app.use(bodyParser());
app.use(bodyParser.json());
    
mongo                   = require('mongodb'),
mongoUSER = "johnnyJones:";
mongoPASS = "pingpong1";
mongoROUTE = "mongodb://";
fullMongoURI = mongoROUTE + mongoUSER + mongoPASS + "@ds063449.mongolab.com:63449/dapppr";

app.set('port', 3000);
server.listen(3000);



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
app.get('/:userId', routes.showUserProductsPage);




app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', {layout: true});
