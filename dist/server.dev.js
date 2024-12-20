"use strict";

var express = require('express');

var _require = require('socket.io'),
    Server = _require.Server;

var path = require('path');

var app = express();
var port = 3000; // Port for local testing
// Serve static files (like CSS, JS, images) from the "public" folder

app.use(express["static"](path.join(__dirname, 'public'))); // Route for home page

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
var server = app.listen(port, function () {
  console.log("Server is running on http://localhost:".concat(port));
});
var io = new Server(server);
io.on('connection', function (socket) {
  console.log('A user connected'); // Handle sending a message

  socket.on('sendMessage', function (data) {
    var time = new Date().toLocaleTimeString();
    io.emit('receiveMessage', {
      username: data.username,
      message: data.message,
      time: time
    });
  }); // Handle user disconnecting

  socket.on('disconnect', function () {
    console.log('User disconnected');
  });
});
//# sourceMappingURL=server.dev.js.map
