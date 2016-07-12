var express = require('express');
var app = express();
var path = require('path');

var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://test.mosquitto.org');
var mqtt    = require('mqtt');

var deviceRoot = 'emdo/devices/' ;
var temperaturePost = require("./model/temperature");

client.on('connect', function () {
  console.log('Estoy arriba: ' + deviceRoot);
  client.subscribe('emdo/devices');
  //client.subscribe(deviceRoot);
});

client.on('message', function (topic, message) {
  // message is Buffer 
  console.log('Entra a client.on');
  console.log(message.toString());

  var post = new temperaturePost(
	{
	  uuid:  "12",
	  name:  "312",
	  kw1:   "123",
	  kw2:   "3123",
	});
	
	console.log("Post Created");
	
	//save model to MongoDB
	post.save(function (err) {
	  if (err) {
			return err;
	  }
	  else {
		console.log("Post saved");
	  }
	});
});

//app.use(express.static('/images'));

//app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.set('view options', {layout: false});
  //app.use(express.favicon());
  //app.use(express.logger('dev'));
  //app.use(express.bodyParser());
  //app.use(express.methodOverride());
  //app.use(app.router);
  //app.use(require('stylus').middleware(__dirname + '/public'));
  app.use('/bower_components',  express.static(__dirname + '/bower_components'));
  app.use(express.static(path.join(__dirname, 'public')));
//});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/getTemperatures', function(req, res) {
	  temperaturePost.find({}, function (err, docs) {
      res.json(docs);
    });
});
