//Lets require/import the HTTP module
var http = require('http');

//Lets define a port we want to listen to
const PORT=7003; 

//We need a function which handles requests and send response
function handleRequest(request, response){
	
    response.end('It Works!! Path Hit: ' + request.url);
	var WebSocketClient = require('websocket').client;
 
	var client = new WebSocketClient();
	 
	client.on('connectFailed', function(error) {
		console.log('Connect Error: ' + error.toString());
	});
	 
	client.on('connect', function(connection) {
		console.log('WebSocket Client Connected');
		connection.on('error', function(error) {
			console.log("Connection Error: " + error.toString());
		});
		connection.on('close', function() {
			console.log('echo-protocol Connection Closed');
		});
		connection.on('message', function(message) {
			if (message.type === 'utf8') {
				console.log("Received: '" + message.utf8Data + "'");
			}
		});
		
		function sendNumber() {
			if (connection.connected) {
				var number = Math.round(Math.random() * 0xFFFFFF);
				connection.sendUTF(number.toString());
				setTimeout(sendNumber, 1000);
			}
		}
		sendNumber();
	});
	 
	client.connect('ws://localhost:8080/', 'echo-protocol');
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});