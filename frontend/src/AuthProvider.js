import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {

    let storedToken = localStorage.getItem('token');
    let storedUserId = localStorage.getItem('userId');

    const [authToken, setAuthToken] = useState(storedToken ? storedToken : null);
    const [userId, setUserId] = useState(storedUserId ? storedUserId : null);

    // if any changes happen in localStorage then change it to the frontend
    useEffect(() => {
        setAuthToken(storedToken);
    }, [storedToken]);

    useEffect(() => {
        setUserId(storedUserId);
    }, [storedUserId]);

    const login = (token, userId) => {
        // setAuthToken(token);
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);

    };

    const logout = () => {
        setAuthToken(null);
        setUserId(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    };

    return (
        <AuthContext.Provider value={{ authToken, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Create a custom hook to use the context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
