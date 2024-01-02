import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from "../../AuthProvider"
import Navbar from '../Components/Navbar/Navbar';

const Home = () => {
    const { logout } = useAuth()
    const logOutUser = () => {
        logout();
    }
    return (
        <>
            <Navbar />
            <div>
                <h1>Home page</h1>
                <Link to="register">Register</Link>
                <br />
                <Link to="login">login</Link>
                <br />
                <Link to="user">User Profile</Link>
                <br />
                <Link to="user/update">Update User Profile</Link>
                <br />
                <Link to="user/delete">delete User Profile</Link>
                <br />
                <button onClick={logOutUser}>Log Out</button>
            </div>
        </>

    )
}

export default Home