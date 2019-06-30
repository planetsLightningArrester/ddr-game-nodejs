const {exec} = require('child_process');

exec('sudo chromium-browser --app=http:\\localhost:3000 --no-sandbox --start-fullscreen');

var gamepad = require("gamepad");

let button = {
	"select": false,
	"start": false,
	"x": false,
	"ball": false,
	"square": false,
	"triangle": false,
	"up": false,
	"down": false,
	"left": false,
	"right": false
}

// Initialize the library
gamepad.init()

// Create a game loop and poll for events
setInterval(gamepad.processEvents, 16);
// Scan for new gamepads as a slower rate
setInterval(gamepad.detectDevices, 500);

/*Button things*/

// Listen for button up events on all gamepads
        gamepad.on("down", function (id, num) {
                //updateButton(num, true);
                if(globalSocket)
                        globalSocket.emit('button pressed', num);
                console.log(num);
        });

        // Listen for button down events on all gamepads
        gamepad.on("up", function (id, num) {
                //updateButton(num, false);
                if(globalSocket)
                        globalSocket.emit('button released', num);
        });



/*Server things*/
var express = require('express');
var app = express();
var http = require('http').Server(app);

var io = require('socket.io')(http);

let globalSocket = null;
let firstRunFlag = true;

app.use('/', express.static(__dirname + '/'));

app.get('/', function(req, res){
	res.senFile(__dirname + '/index.html');
});

http.listen(3000, function(){
	console.log('Listen on port 3000');
});

io.on('connection', (socket) => {

	if(firstRunFlag){
		firstRunFlag = false;
		exec('xdotool mousemove 200 200 && xdotool click 1');
	}

	console.log('connected');
	globalSocket = socket;

	socket.on('disconnecting', function(){
		globalSocket = null;
		console.log('connection closed');
	})

});

function updateButton(buttonNumber, state){
	switch(buttonNumber){
		case 0:
			button.x = state;
			break;
		case 1:
			button.ball = state;
			break;
		case 2:
			button.triangle = state;
			break;
		case 3:
			button.square = state;
			break;
		case 8:
			button.select = state;
			break;
		case 9:
			button.start = state;
			break;
		case 13:
			button.up = state;
			break;
		case 14:
			button.down = state;
			break;
		case 15:
			button.left = state;
			break;
		case 16:
			button.right = state;
			break;
		default:
			break;
	}
}
