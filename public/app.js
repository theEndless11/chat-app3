const socket = io();  // Connect to the Socket.IO server

const form = document.getElementById('chat-form');
const messages = document.getElementById('messages');
const usernameInput = document.getElementById('username');
const messageInput = document.getElementById('message');
const userList = document.getElementById('user-list');

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = usernameInput.value;
  const message = messageInput.value;

  if (username && message) {
    socket.emit('sendMessage', {
      username: username,
      message: message,
    });

    // Clear the input field after sending the message
    messageInput.value = '';
  }
});

// Listen for incoming messages
socket.on('receiveMessage', (data) => {
  const time = new Date().toLocaleTimeString();
  const messageElement = document.createElement('div');
  messageElement.classList.add('user');
  messageElement.innerHTML = `<strong>${data.username}</strong> [${time}]: ${data.message}`;
  messages.appendChild(messageElement);

  // Scroll to the bottom of the messages
  messages.scrollTop = messages.scrollHeight;
});

// Listen for user join/leave events
socket.on('userJoin', (username) => {
  const joinMessage = document.createElement('div');
  joinMessage.classList.add('system');
  joinMessage.innerHTML = `${username} joined the chat`;
  messages.appendChild(joinMessage);
});

socket.on('userLeave', (username) => {
  const leaveMessage = document.createElement('div');
  leaveMessage.classList.add('system');
  leaveMessage.innerHTML = `${username} left the chat`;
  messages.appendChild(leaveMessage);
});

// Listen for active users
socket.on('updateUsers', (users) => {
  userList.innerHTML = ''; // Clear the list
  users.forEach((user) => {
    const userItem = document.createElement('li');
    userItem.classList.add('active');
    userItem.innerText = user;
    userList.appendChild(userItem);
  });
});
