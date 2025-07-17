// server.js
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = 3000;

// Serve static files from public folder
app.use(express.static('public'));

// On client connection
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for chat messages
  socket.on('chat message', (msg) => {
    // Send message to *all* connected clients
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

http.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
