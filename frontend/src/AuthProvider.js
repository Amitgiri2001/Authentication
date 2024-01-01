import React, { createContext, useContext, useState } from 'react';

// Create the context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
    const storedToken = localStorage.getItem('token');
    const [authToken, setAuthToken] = useState(storedToken ? storedToken : null);

    const login = (token) => {
        setAuthToken(token);
        localStorage.setItem('token', token);

    };

    const logout = () => {
        setAuthToken(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ authToken, login, logout }}>
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
