require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routerů
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);

// Připojení k databázi a spuštění serveru
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Připojeno k MongoDB');
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server běží na portu ${process.env.PORT || 5000}`);
        });
    })
    .catch((error) => console.error('Chyba při připojení k databázi:', error));
