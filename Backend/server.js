require('dotenv').config(); // Načtení proměnných prostředí
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io'); // Import socket.io

// Inicializace aplikace
const app = express();
const server = http.createServer(app); // Vytvoření HTTP serveru
const io = new Server(server); // Inicializace socket.io

// Middleware
app.use(cors());
app.use(express.json());

// Kontrola načtení MONGO_URI
if (!process.env.MONGO_URI) {
    console.error('Chyba: MONGO_URI není definováno v souboru .env.');
    process.exit(1); // Ukončení aplikace
}

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

// Připojení k databázi MongoDB
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Připojeno k MongoDB');
        // Spuštění serveru po úspěšném připojení k databázi
        const PORT = process.env.PORT || 5000;
        server.listen(PORT, () => {
            console.log(`Server běží na portu ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Chyba při připojení k databázi:', error.message);
        process.exit(1); // Ukončení aplikace při selhání připojení
    });
