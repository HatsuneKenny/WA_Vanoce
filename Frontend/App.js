import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    const handleLogin = () => setIsLoggedIn(true);

    return (
        <Router>
            <Routes>
                <Route path="/" element={!isLoggedIn ? <Home onLogin={handleLogin} /> : <Navigate to="/chat" />} />
                <Route path="/chat" element={isLoggedIn ? <Chat /> : <Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
