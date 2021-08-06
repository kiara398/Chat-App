// const mongoose = require('mongoose');
const io = require("socket.io")(3000, {
    cors: {
      origin: "*",
    },
  });

const users = {}

io.on('connection', socket =>{
    socket.on('new-user', names =>{
users[socket.id]= names
socket.broadcast.emit('user-connected', names)
    })
socket.on('send-chat-message', message =>{
    socket.broadcast.emit('chat-message', {message: message, names: users[socket.id]})
})
socket.on('disconnect', () =>{
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
})
})