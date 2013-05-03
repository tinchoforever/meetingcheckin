/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , faye = require('faye')
  , path = require('path');

var app = express();
var FayeClient = new faye.NodeAdapter({mount: '/sockets', timeout: 45});
var client = new faye.Client('yourserviceURL/sockets');

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/', function(req, res){
  res.render('index');
});

app.post('/', function(req, res){
  client.publish('/data', req.body);
});

app.get('/test', function(req, res){
  res.render('sockets');
});

var Server = http.createServer(app)

FayeClient.attach(Server);

Server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});