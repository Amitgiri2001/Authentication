// SingleUser.js

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthProvider';
import axios from 'axios';
import styles from './SingleUser.module.css';
import { Link } from 'react-router-dom';
import UnauthorizedPage from '../../UnauthorizedPage';
import Navbar from '../Components/Navbar/Navbar';

const SingleUser = () => {
    const [error, setError] = useState({ status: 200, statusText: '' });

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
                setError({ status: e.response.status, statusText: e.response.statusText })
                console.error("Error during getti   ng single user:", e.response);
            }
        }

        getUserData();
    }, [authToken, userId]);

    return (
        <>
            <Navbar />
            {/* {console.log(authToken)} */}
            {(error.status === 401 || error.status === 404 || error.status === 500) ? <UnauthorizedPage /> : <div className={styles.singleUserContainer}>
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
            </div>}


        </>
    );
};

export default SingleUser;
