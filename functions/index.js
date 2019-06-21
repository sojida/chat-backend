const functions = require('firebase-functions');
const path = require('path');
const express = require('express');
const socket = require('socket.io');


const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to chat back')
})

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', '404.html'))
})

const server = app.listen(5000, () => {
  console.log('server started at port 5000');
});

// socket setup
const io = socket(server);

io.on('connection', (socket) => {
  console.log('made socket connection', socket.id);
  socket.on('chat', (data) => {
    io.sockets.emit('chat', data);
  });
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });
});

exports.app = functions.https.onRequest(app);
