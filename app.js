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


Parse = require('parse').Parse;
Artist = Parse.Object.extend('Artist');

Parse.initialize("1m5YuobBTxJaGyIS5TfdJPY0hWsNiRYKxR9x6XFy", "7qklAQq7GXWNspOc4ZSaS6a1ZPNMSF8CEijqgQL2");

var query = new Parse.Query(Parse.User);
query.find({
  success: function(users) {
    for (var i = 0; i < users.length; ++i) {
      console.log(users[i].get('username'));
    }
  }
});

app.use(express.static(__dirname + "/public"));
app.use(bodyParser());
app.use(bodyParser.json());
app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url);
  next();
});

app.set('port', 3000);
server.listen(3000);

app.get('/checkout', function(req, res){
    res.render('checkout');
});
app.get('/thanks', function(req, res){
    res.render('thanks');
});

app.get('/:userId/edit', routes.editUserProductsPage);
app.get('/:userId', routes.showUserProductsPage);
app.post('/userSignUpForPetition', routes.userSignsPetitionAndSignsUp);
app.get('/', routes.signUpPage);
app.post('/', routes.postUserName);

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', {layout: true});
