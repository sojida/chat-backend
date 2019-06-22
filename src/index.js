import express from 'express';
import socket from 'socket.io';
import cors from 'cors';

const app = express();

app.use(cors())

app.get('/', (req, res) => {
    res.send('Welcome to chat back')
});

app.use('*', (req, res) => {
    res.send('route not found');
});

const port = process.env.PORT || 5000

const server = app.listen(port, () => {
  console.log(`server started at port ${port}`);
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

