"use strict";

var socket = io(); // Connect to the Socket.IO server

var form = document.getElementById('chat-form');
var messages = document.getElementById('messages');
var usernameInput = document.getElementById('username');
var messageInput = document.getElementById('message');
var userList = document.getElementById('user-list'); // Handle form submission

form.addEventListener('submit', function (e) {
  e.preventDefault();
  var username = usernameInput.value;
  var message = messageInput.value;

  if (username && message) {
    socket.emit('sendMessage', {
      username: username,
      message: message
    }); // Clear the input field after sending the message

    messageInput.value = '';
  }
}); // Listen for incoming messages

socket.on('receiveMessage', function (data) {
  var time = new Date().toLocaleTimeString();
  var messageElement = document.createElement('div');
  messageElement.classList.add('user');
  messageElement.innerHTML = "<strong>".concat(data.username, "</strong> [").concat(time, "]: ").concat(data.message);
  messages.appendChild(messageElement); // Scroll to the bottom of the messages

  messages.scrollTop = messages.scrollHeight;
}); // Listen for user join/leave events

socket.on('userJoin', function (username) {
  var joinMessage = document.createElement('div');
  joinMessage.classList.add('system');
  joinMessage.innerHTML = "".concat(username, " joined the chat");
  messages.appendChild(joinMessage);
});
socket.on('userLeave', function (username) {
  var leaveMessage = document.createElement('div');
  leaveMessage.classList.add('system');
  leaveMessage.innerHTML = "".concat(username, " left the chat");
  messages.appendChild(leaveMessage);
}); // Listen for active users

socket.on('updateUsers', function (users) {
  userList.innerHTML = ''; // Clear the list

  users.forEach(function (user) {
    var userItem = document.createElement('li');
    userItem.classList.add('active');
    userItem.innerText = user;
    userList.appendChild(userItem);
  });
});
//# sourceMappingURL=app.dev.js.map
