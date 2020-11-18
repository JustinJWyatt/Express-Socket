const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const server = http.createServer(app);
const app = express();

const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room);
    
        socket.join(user.room);
    
        // Welcome current user
        socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));
    
        // Broadcast when a user connects
        socket.broadcast
          .to(user.room)
          .emit(
            'message',
            formatMessage(botName, `${user.username} has joined the chat`)
          );
    
        // Send users and room info
        io.to(user.room).emit('roomUsers', {
          room: user.room,
          users: getRoomUsers(user.room)
        });
});

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));