// ProtectedRoute.js

import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import UnauthorizedPage from './UnauthorizedPage';

const ProtectedRoute = ({ element: Element, ...rest }) => {
    const [isLoading, setLoading] = useState(true);
    const [isAuthorized, setAuthorized] = useState(false);

    useEffect(() => {
        // Simulate an asynchronous check for authentication status or other conditions
        const checkAuthorization = async () => {
            try {
                // You might want to replace this with an actual API call or authentication check
                // For this example, we're checking if the user is authenticated based on some condition
                const isAuthenticated = localStorage.getItem('token') ? true : false; // Replace with your authentication logic

                setAuthorized(isAuthenticated);
            } catch (error) {
                console.error('Error checking authorization:', error);
            } finally {
                setLoading(false);
            }
        };

        checkAuthorization();
    }, []);

    if (isLoading) {
        // You can also show a loading spinner or other UI while checking authorization
        return null;
    }

    return isAuthorized ? (
        <Route {...rest} element={<Element />} />
    ) : (
        <Route to="/unauthorized" replace={true} />
    );
};

export default ProtectedRoute;
