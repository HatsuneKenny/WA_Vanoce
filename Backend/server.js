require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const messageRoutes = require('./routes/messages');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// Middleware
app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/chat', authMiddleware, chatRoutes);
app.use('/messages', authMiddleware, messageRoutes);

// Real-time chat via WebSocket
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
    });

    socket.on('sendMessage', (data) => {
        io.to(data.roomId).emit('message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        server.listen(5000, () => console.log('Server running on port 5000'));
    })
    .catch(err => console.error(err));
