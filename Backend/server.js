const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io'); // Import socket.io

const app = express();
const server = http.createServer(app); // Vytvoření HTTP serveru
const io = new Server(server); // Inicializace socket.io

// Middleware
app.use(cors());
app.use(express.json());

// WebSocket komunikace
io.on('connection', (socket) => {
    console.log('Uživatel připojen');
    socket.on('message', (msg) => {
        console.log('Zpráva od klienta:', msg);
        socket.broadcast.emit('message', msg); // Odeslání zprávy všem ostatním klientům
    });

    socket.on('disconnect', () => {
        console.log('Uživatel odpojen');
    });
});

// Připojení k databázi a spuštění serveru
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Připojeno k MongoDB');
        server.listen(process.env.PORT || 5000, () => {
            console.log(`Server běží na portu ${process.env.PORT || 5000}`);
        });
    })
    .catch((error) => console.error('Chyba při připojení k databázi:', error));
