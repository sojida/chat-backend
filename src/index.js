import express from 'express';
import socket from 'socket.io';


const app = express();

const server = app.listen(8000, () => {
  console.log('server started at port 8000');
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
