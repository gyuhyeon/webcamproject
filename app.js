var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);

var request=require('request');

var port=8000;
server.listen(port);

// Routing
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(__dirname + '/public'));

app.get('/stream1',function(req,res){
  var url="http://122.46.145.125:18081/"
  request(url).pipe(res);
});
app.post('/print', function(req,res){
  
});


// Socket.io


io.on('connection', function (socket) {

  // when the client emits 'camera capture', this listens and executes
  socket.on('camera capture', function (data) {
    // we broadcast to everyone execute 'camera capture'
    io.sockets.emit('camera capture', {
      username: data
    });
  });

});
