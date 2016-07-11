var express = require('express');
var app = express();

var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://test.mosquitto.org');
 
client.on('connect', function () {
  client.subscribe('emdo/devices');
});
 
client.on('message', function (topic, message) {
  // message is Buffer 
  console.log(message.toString());
  client.end();
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});