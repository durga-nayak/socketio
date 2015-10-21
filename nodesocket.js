var express = require('express'),
	http = require('http'),
	path = require('path'),
	io = require('socket.io');
	
var app = express();
var http = http.Server(app);
var io = io(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});