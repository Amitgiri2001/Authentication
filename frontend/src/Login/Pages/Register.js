import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar/Navbar';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmedPassword: '',
        profileImage: null, // Use null as the initial value for the file
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        // Handle file input separately
        if (type === 'file') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: files[0], // Assuming only one file is selected
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (formData.password !== formData.confirmedPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            // Use FormData to handle file uploads
            const formDataForServer = new FormData();
            formDataForServer.append('username', formData.username);
            formDataForServer.append('email', formData.email);
            formDataForServer.append('password', formData.password);
            formDataForServer.append('confirmedPassword', formData.confirmedPassword);
            formDataForServer.append('userImage', formData.profileImage);

            // Make a POST request to your server
            const response = await axios.post('/api/auth/register', formDataForServer);

            // Handle the response from the server
            console.log('Server response:', response.data);
        } catch (error) {
            console.error('Error during registration:', error.response.data);
            // Handle error (display error message, etc.)
        }
    };

    return (
        <>
            <Navbar />

            <div>
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />


                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />

                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />

                    <label>
                        Confirm Password:
                        <input
                            type="password"
                            name="confirmedPassword"
                            value={formData.confirmedPassword}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />

                    <label>
                        Profile Image:
                        <input
                            type="file"
                            name="profileImage"
                            onChange={handleChange}
                            accept="image/*" // Restrict file types to images
                        />
                    </label>
                    <br />

                    <button type="submit">Register</button>
                </form>
            </div></>

    );
};

export default Register;
