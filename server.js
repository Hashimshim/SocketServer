const http = require('http');
const express = require('express');


const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });;
//const io = socketIO(server);


io.on('connection', (socket) => {
  console.log('Client connected');
  // Listen for messages from the client
  socket.on('message', (message) => {
    console.log(`Received: ${message}`);
    // Send a response back to the client
    io.emit('message', `Server received: ${message}`);
  });
  socket.on('worklogAccepted', (message) => {
    console.log(`Received: ${message}`);
    // Send a response back to the client
    io.emit('worklogAccepted', `Server received: ${message}`);
  });
  socket.on('worklogDenied', (message) => {
    console.log(`Received: ${message}`);
    // Send a response back to the client
    io.emit('worklogAccepted', `Server received: ${message}`);
  });
  // Listen for the socket to disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
