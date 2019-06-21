"use strict";

var _express = _interopRequireDefault(require("express"));

var _socket = _interopRequireDefault(require("socket.io"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var server = app.listen(8000, function () {
  console.log('server started at port 8000');
}); // socket setup

var io = (0, _socket["default"])(server);
io.on('connection', function (socket) {
  console.log('made socket connection', socket.id);
  socket.on('chat', function (data) {
    io.sockets.emit('chat', data);
  });
  socket.on('typing', function (data) {
    socket.broadcast.emit('typing', data);
  });
});