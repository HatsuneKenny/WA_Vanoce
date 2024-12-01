import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

const Home = ({ onLogin }) => {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <div>
            {showLogin ? (
                <Login onLogin={onLogin} />
            ) : (
                <Register />
            )}
            <button onClick={() => setShowLogin(!showLogin)}>
                {showLogin ? 'Switch to Register' : 'Switch to Login'}
            </button>
        </div>
    );
};

export default Home;
