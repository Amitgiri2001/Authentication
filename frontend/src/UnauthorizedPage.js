// UnauthorizedPage.js

import React from 'react';
import styles from './UnauthorizedPage.module.css';
import { Link } from 'react-router-dom';

const UnauthorizedPage = () => {
    return (
        <div className={styles.unauthorizedContainer}>
            <h2>401 Unauthorized</h2>
            <p>
                You do not have permission to access this page. Please login to continue.
            </p>
            <Link to="/login"><button>Login</button></Link>
        </div>
    );
};

export default UnauthorizedPage;
