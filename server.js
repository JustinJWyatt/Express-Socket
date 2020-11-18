const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const server = http.createServer(app);
const app = express();

const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {

});

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));