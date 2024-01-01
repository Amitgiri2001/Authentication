import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from "../../AuthProvider"

const Home = () => {
    const { logout } = useAuth()
    const logOutUser = () => {
        logout();
    }
    return (

        <div>
            <h1>Home page</h1>
            <Link to="register">Register</Link>
            <br />
            <Link to="login">login</Link>
            <br />
            <Link to="user/details">User Profile</Link>
            <br />
            <Link to="user/update">Update User Profile</Link>
            <br />
            <Link to="user/delete">delete User Profile</Link>
            <br />
            <button onClick={logOutUser}>Log Out</button>
        </div>
    )
}

export default Home