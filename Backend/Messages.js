const express = require('express');
const Message = require('../models/Message');
const router = express.Router();

router.get('/all', async (req, res) => {
    const messages = await Message.find();
    res.json(messages);
});

router.get('/user/:userId', async (req, res) => {
    const messages = await Message.find({ userId: req.params.userId });
    res.json(messages);
});

router.get('/room/:roomId', async (req, res) => {
    const messages = await Message.find({ roomId: req.params.roomId });
    res.json(messages);
});

router.get('/search', async (req, res) => {
    const { word } = req.query;
    const regex = new RegExp(word, 'i'); // Case insensitive
    const messages = await Message.find({ text: regex });
    res.json(messages);
});

module.exports = router;
