const express = require('express');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const port = 3000; // Port for local testing

// Serve static files (like CSS, JS, images) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Route for home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const io = new Server(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle sending a message
  socket.on('sendMessage', (data) => {
    const time = new Date().toLocaleTimeString();
    io.emit('receiveMessage', {
      username: data.username,
      message: data.message,
      time: time,
    });
  });

  // Handle user disconnecting
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});



