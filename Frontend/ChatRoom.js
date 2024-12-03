import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import API from '../utils/api';

const ChatRoom = ({ roomId }) => {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const socket = io('http://localhost:5000'); // URL backendu

    useEffect(() => {
        socket.emit('joinRoom', roomId);

        socket.on('message', (message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.disconnect();
        };
    }, [roomId]);

    const sendMessage = async (e) => {
        e.preventDefault();
        const message = { roomId, text, userId: 'Me' };
        socket.emit('sendMessage', message);
        setText('');
    };

    return (
        <div>
            <div>
                {messages.map((msg, idx) => (
                    <div key={idx}>{msg.text}</div>
                ))}
            </div>
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default ChatRoom;
