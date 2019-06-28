import express from 'express';
import socket from 'socket.io';
import cors from 'cors';

const app = express();

app.use(cors())

app.get('/', (req, res) => {
    res.send('Welcome to chat back')
});

const port = process.env.PORT || 5000

const server = app.listen(port, () => {
  console.log(`server started at port ${port}`);
});

// socket setup
const io = socket(server);

app.use('*', (req, res) => {
    res.send('route not found');
});


io.on('connection', (socket) => {
  console.log('made socket connection', socket.id);

  socket.on('join', (res) => {
    console.log(`someone joined ${res.pathName}`)
    socket.join(res.pathName)
    io.to(res.pathName).emit('join', res);

    socket.on('chat', (data) => {
      io.in(res.pathName).emit('chat', data);
    });

    socket.on('typing', (data) => {
      socket.to(res.pathName).emit('typing', data);
    });
  });


});

