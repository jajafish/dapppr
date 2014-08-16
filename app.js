var express                 = require('express'),
    routes                  = require("./routes"),
    app                     = express(),
    server                  = require("http").createServer(app),
    bodyParser              = require("body-parser"),
    http                    = require('http'),
    mongoose                = require('mongoose'),
    config                  = require('config'),
    utils                   = require('./lib/utils'),
    request                 = require('request'),
    mongooseConnection      = utils.connectToDatabase(mongoose, config.db),
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



// USER MODEL
require("./models/User")(mongooseConnection);



// TEST BINARY IMAGE SAVING FUNCTION WITH LOCAL PNG
app.get('/binary', function(req, res){

    var localPNG = ('./public/img/kangTest.png');
    var dataUri = base64Image(localPNG);
    console.log(dataUri);

    function base64Image(src) {
        var data = fs.readFileSync(src).toString("base64");
        return util.format("data:%s;base64,%s", mime.lookup(src), data);
    }

    res.render('imageTest',{binaryImageSource: dataUri});

});

// TEST BINARY IMAGE SAVING WITH REMOTE PNG
app.get('/binary2', function(req, res){

    var options = {
        host: 'https://d13yacurqjgara.cloudfront.net',
        path: '/users/44490/screenshots/1248634/kangaroorunappgameicon.png'
    };

    request.get({url: 'https://d13yacurqjgara.cloudfront.net/users/44490/screenshots/1248634/kangaroorunappgameicon.png', encoding: 'binary'}, function (err, response, body) {
      fs.writeFile("test.png", body, 'binary', function(err) {
        if(err)
          console.log(err);
        else
          console.log("The file was saved!");
      }); 
    });

});



// SIGNUP WITH DRIBBBLE ACCOUNT
app.get('/', routes.signUpPage);
app.post('/', routes.postUserName);

// EDIT SHIRT
app.get('/editShirt', function(req, res){
    res.render('editProduct');
});

// SHOW USER PRODUCTS PAGE
app.get('/:userId', routes.showUserProductsPage);


app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', {layout: true});

