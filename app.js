var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);
//printer on raspberry pi
var python = require('python-shell');

var request = require('request');
var bodyParser = require('body-parser');
var fs = require('fs');

var port=8000;
server.listen(port);
//fuckmylife
// Routing
app.use(bodyParser.json({limit:'20mb'}));
//querystring : false, qs library : true
app.use(bodyParser.urlencoded({extended: false, limit:'20mb'}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if(req.url.indexOf('capture12.jpg')>=0){
    res.header("Cache-Control", "no-cache");
  }
  next();
});
app.use(express.static(__dirname + '/public'));
//proxy from webcam server to avoid CORS complaining
app.get('/stream1',function(req,res){
  //URGENT CHANGE TO LOCAL(RASPBERRY PI IP ADDRESS + PORT)
  //var url="http://192.168.219.108:8081";
  var url="http://cam.linpro.no/mjpg/video.mjpg"
  //var url="http://122.46.145.125:18081/"
  var ru=request(url);
  var pipe=ru.pipe(res);
  pipe.on('error', function(){
    console.log('disconnected!');
  })
  req.on('close', function(){
    pipe.end();
    ru.end();
    res.end();
    req.end();
    pipe.destroy();
  });
  req.on('end', function(){
    pipe.end();
    ru.end();
    res.end();
    req.end();
    pipe.destroy();
  });
  req.on('finish', function(){
    pipe.end();
    ru.end();
    res.end();
    req.end();
    pipe.destroy();
  });
});
app.get('/stream2',function(req,res){
  var url="http://camera.nton.lviv.ua/mjpg/video.mjpg"
  var pipe=request(url).pipe(res);
  pipe.on('error', function(){
    console.log('disconnected!');
  })
  req.on('close', function(){
    pipe.end();
  });
  req.on('end', function(){
    pipe.end()
  });
  req.on('finish', function(){
    pipe.end()
  });
});
app.get('/stream3',function(req,res){
  var url="http://194.248.190.92/mjpg/video.mjpg"
  var pipe=request(url).pipe(res);
  pipe.on('error', function(){
    console.log('disconnected!');
  })
  req.on('close', function(){
    pipe.end();
  });
  req.on('end', function(){
    pipe.end()
  });
  req.on('finish', function(){
    pipe.end()
  });
});
//proxy seems to kill the server or at least slow it down a lot. changing to hosting the static images directly.
/*
app.get('/stream4',function(req,res){
  var url="http://writm.com/wp-content/uploads/2016/08/Cat-hd-wallpapers.jpg"
  request(url).pipe(res);
});
app.get('/stream5',function(req,res){
  var url="https://pixabay.com/static/uploads/photo/2016/05/18/20/57/cat-1401557_960_720.jpg"
  request(url).pipe(res);
});
app.get('/stream6',function(req,res){
  var url="https://pixabay.com/static/uploads/photo/2014/03/29/09/17/cat-300572_960_720.jpg"
  request(url).pipe(res);
});
app.get('/stream7',function(req,res){
  var url="http://www.rd.com/wp-content/uploads/sites/2/2016/02/06-train-cat-shake-hands.jpg"
  request(url).pipe(res);
});
app.get('/stream8',function(req,res){
  var url="http://rollycat.com/wp-content/uploads/2014/09/apple-mac-cat-face-like-angel-soul_342655.jpg"
  request(url).pipe(res);
});
app.get('/stream9',function(req,res){
  var url="https://s-media-cache-ak0.pinimg.com/564x/29/9e/56/299e56ab07c75af6407289ecc4ab1dd6.jpg"
  request(url).pipe(res);
});
app.get('/stream10',function(req,res){
  var url="https://s-media-cache-ak0.pinimg.com/564x/29/9e/56/299e56ab07c75af6407289ecc4ab1dd6.jpg"
  request(url).pipe(res);
});
app.get('/stream11',function(req,res){
  var url="https://s-media-cache-ak0.pinimg.com/564x/29/9e/56/299e56ab07c75af6407289ecc4ab1dd6.jpg"
  request(url).pipe(res);
});
app.get('/stream12',function(req,res){
  var url="https://s-media-cache-ak0.pinimg.com/564x/29/9e/56/299e56ab07c75af6407289ecc4ab1dd6.jpg"
  request(url).pipe(res);
});
app.get('/stream13',function(req,res){
  var url="https://s-media-cache-ak0.pinimg.com/564x/29/9e/56/299e56ab07c75af6407289ecc4ab1dd6.jpg"
  request(url).pipe(res);
});
app.get('/stream14',function(req,res){
  var url="https://s-media-cache-ak0.pinimg.com/564x/29/9e/56/299e56ab07c75af6407289ecc4ab1dd6.jpg"
  request(url).pipe(res);
});
app.get('/stream15',function(req,res){
  var url="https://s-media-cache-ak0.pinimg.com/564x/29/9e/56/299e56ab07c75af6407289ecc4ab1dd6.jpg"
  request(url).pipe(res);
});
app.get('/stream16',function(req,res){
  var url="https://s-media-cache-ak0.pinimg.com/564x/29/9e/56/299e56ab07c75af6407289ecc4ab1dd6.jpg"
  request(url).pipe(res);
});
app.get('/stream17',function(req,res){
  var url="https://s-media-cache-ak0.pinimg.com/564x/29/9e/56/299e56ab07c75af6407289ecc4ab1dd6.jpg"
  request(url).pipe(res);
});
app.get('/stream18',function(req,res){
  var url="https://s-media-cache-ak0.pinimg.com/564x/29/9e/56/299e56ab07c75af6407289ecc4ab1dd6.jpg"
  request(url).pipe(res);
});
app.get('/stream19',function(req,res){
  var url="https://s-media-cache-ak0.pinimg.com/564x/29/9e/56/299e56ab07c75af6407289ecc4ab1dd6.jpg"
  request(url).pipe(res);
});
app.get('/stream20',function(req,res){
  var url="https://s-media-cache-ak0.pinimg.com/564x/29/9e/56/299e56ab07c75af6407289ecc4ab1dd6.jpg"
  request(url).pipe(res);
});
app.get('/stream21',function(req,res){
  var url="https://s-media-cache-ak0.pinimg.com/564x/29/9e/56/299e56ab07c75af6407289ecc4ab1dd6.jpg"
  request(url).pipe(res);
});
app.get('/stream22',function(req,res){
  var url="https://s-media-cache-ak0.pinimg.com/564x/29/9e/56/299e56ab07c75af6407289ecc4ab1dd6.jpg"
  request(url).pipe(res);
});
app.get('/stream23',function(req,res){
  var url="https://s-media-cache-ak0.pinimg.com/564x/29/9e/56/299e56ab07c75af6407289ecc4ab1dd6.jpg"
  request(url).pipe(res);
});
app.get('/stream24',function(req,res){
  var url="https://s-media-cache-ak0.pinimg.com/564x/29/9e/56/299e56ab07c75af6407289ecc4ab1dd6.jpg"
  request(url).pipe(res);
});
app.get('/stream25',function(req,res){
  var url="https://s-media-cache-ak0.pinimg.com/564x/29/9e/56/299e56ab07c75af6407289ecc4ab1dd6.jpg"
  request(url).pipe(res);
});
*/

//this is for keeping track of current print phase(alive video feed, captured feed)
var videostatus = [false, false, false];

//this part needs to be migrated to raspberry pi.
app.post('/print', function(req,res){
  //DESIGN CHANGE REQUEST
  //if(videostatus[0]==true&&videostatus[1]==true&&videostatus[2]==true){
  if(videostatus[0]==true){
   //reset videostatus
   videostatus = [false, false, false];
   //saving the incoming image
   // string generated by canvas.toDataURL()
   var img = req.body.imgBase64;
   // strip off the data: url prefix to get just the base64-encoded bytes
   var data = img.replace(/^data:image\/\w+;base64,/, "");
   var buf = new Buffer(data, 'base64');
   //sync so that capture emit can be sent when it's done
   fs.writeFileSync('public/print.png', buf);
   console.log('print');
   //printer on raspberry pi
   python.run('printertest.py', function(err, results){
    if (err) throw err;
   });
   io.sockets.emit('print');

   //need code to send request to raspberry pi for printing
   //request.post('0.0.0.0/print');
  }

});

app.post('/capture', function(req,res){
  //saving the incoming image
  // string generated by canvas.toDataURL()
  var img = req.body.imgBase64;
  // strip off the data: url prefix to get just the base64-encoded bytes
  var data = img.replace(/^data:image\/\w+;base64,/, "");
  var buf = new Buffer(data, 'base64');
  //sync so that capture emit can be sent when it's done
  fs.writeFileSync('public/capture'+(parseInt(req.body.imgId)+11)+'.jpg', buf);
  console.log('capture');
  videostatus[parseInt(req.body.imgId)-1]=true;
  io.sockets.emit('capture', {
    userid: req.body.imgId
  });

});


// Socket.io

io.on('connection', function (socket) {
  console.log('User connected');
  socket.emit('init', {
    videostatus : videostatus
  });
  // when the client emits 'camera capture', this listens and executes
  /*
  socket.on('camera capture', function (data) {
    // we broadcast to everyone execute 'camera capture'
    io.sockets.emit('camera capture', {
      userid: data
    });
  });
  */
});
