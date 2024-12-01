import React, { useState } from 'react';
import ChatRoom from '../components/ChatRoom';

const Chat = () => {
    const [roomId, setRoomId] = useState('');

    return (
        <div>
            <input
                type="text"
                placeholder="Enter Room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
            />
            {roomId && <ChatRoom roomId={roomId} />}
        </div>
    );
};

export default Chat;
