// UnauthorizedPage.js

import React from 'react';
import styles from './UnauthorizedPage.module.css';

const UnauthorizedPage = () => {
    return (
        <div className={styles.unauthorizedContainer}>
            <h2>401 Unauthorized</h2>
            <p>
                You do not have permission to access this page. Please login to continue.
            </p>
        </div>
    );
};

export default UnauthorizedPage;
