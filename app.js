var express                 = require('express'),
    routes                  = require("./routes"),
    app                     = express(),
    server                  = require("http").createServer(app),
    bodyParser              = require("body-parser"),
    http                    = require('http'),
    request                 = require('request');


app.set('port', 3000);
server.listen(3000);

app.use(express.static(__dirname + "/public"));
app.use(bodyParser());
app.use(bodyParser.json());

app.use(function (req, res, next){
    console.log(req.body);
    next();
});

app.get('/', routes.sayHello);

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', {layout: true});

