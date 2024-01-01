// SingleUser.js

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthProvider';
import axios from 'axios';
import styles from './SingleUser.module.css';
import { Link } from 'react-router-dom';

const SingleUser = () => {
    const userId = localStorage.getItem('userId');
    const { authToken } = useAuth();
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
                console.log(response);
                console.log(data.user);

                if (response) {
                    setUser(data.user);
                }
            } catch (e) {
                console.error("Error during getting single user:", e.response);
            }
        }

        getUserData();
    }, [authToken, userId]);

    return (
        <div className={styles.singleUserContainer}>
            {user && (
                <>
                    {user.imageUrl && (
                        <img className={styles.userImage} src={`http://localhost:3001${user.imageUrl}`} alt="User" />
                    )}
                    <div className={styles.userData}>
                        <div className={styles.username}>User Name: {user.username}</div>
                        <div className={styles.email}>Email:{user.email}</div>
                        <Link to="update"><button>Update Profile</button></Link>
                        <Link to="delete"><button>Delete Profile</button></Link>
                        {/* Add more user data fields as needed */}
                    </div>
                </>
            )}
        </div>
    );
};

export default SingleUser;
