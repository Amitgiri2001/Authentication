// Navbar.js

import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../AuthProvider';
import axios from 'axios';

const Navbar = () => {

    const { authToken, userId } = useAuth();
    const [user, setUser] = useState();

    useEffect(() => {
        async function getUserData() {
            try {
                const response = await axios.get(`/user/${userId}`, {
                    headers: {
                        'Authorization': authToken,
                    }
                });

                const data = response.data;
                // console.log(response);
                // console.log(data.user);

                if (response) {
                    setUser(data.user);
                }
            } catch (e) {
                console.error("Error during getting single user:", e.response);
            }
        }

        getUserData();
    }, [authToken, userId]);
    const { logout } = useAuth();

    const [isLoggedIn, setLoggedIn] = useState(authToken ? true : false);

    const handleLogin = () => {
        // Implement your login logic here
        // For example, setLoggedIn(true);
    };

    const handleLogout = () => {
        logout();
        setLoggedIn(false);
    };

    return (
        <nav className={styles.navbarContainer}>
            <div className={styles.logo}>Your Logo</div>

            <div className={styles.navButtons}>
                {isLoggedIn ? (
                    <>
                        <button onClick={handleLogout}>Logout</button>
                        <Link to="/user">{user && <img className={styles.userImage} src={`http://localhost:3001${user.imageUrl}`} alt="User" />}</Link>
                    </>
                ) : (
                    <>
                        <Link to="/login"><button>Login</button></Link>
                        <Link to="/register"><button>Register</button></Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
