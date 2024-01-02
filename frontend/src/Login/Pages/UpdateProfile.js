import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthProvider';
import axios from 'axios';
import UnauthorizedPage from "../../UnauthorizedPage"

const UpdateProfile = () => {
    const [error, setError] = useState({ status: 200, statusText: '' });

    const { authToken, userId } = useAuth();

    const [user, setUser] = useState({
        username: '',
        email: '',
        profileImage: null,
    });

    useEffect(() => {
        async function getUserData() {
            try {
                const response = await axios.get(`/user/${userId}`, {
                    headers: {
                        'Authorization': authToken,
                    }
                });

                // const data = response.data;
                // console.log("RES:  ", response);
                // console.log(data.user)

                if (response.status === 200) {
                    setUser(response.data.user);
                } else {

                    setError({ status: response.status, statusText: response.statusText })

                }
            } catch (e) {
                console.error("Error during getting single user:", e.response);
                setError({ status: e.status, statusText: e.statusText })
            }


        }
        getUserData();
    }, [authToken, error, userId]);

    // { user && console.log(user) }
    // make changes in there then call update
    // Initialize form data with user data
    const [formData, setFormData] = useState({
        username: user ? user.username : '',
        email: user ? user.email : '',
        profileImage: user ? user.imageUrl : null,
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


        try {
            // Use FormData to handle file uploads
            const formDataForServer = new FormData();
            formDataForServer.append('username', formData.username);
            formDataForServer.append('email', formData.email);

            formDataForServer.append('userImage', formData.profileImage);

            // Make a POST request to your server
            const response = await axios.put(`/user/${userId}`, formDataForServer, {
                headers: {
                    'Authorization': authToken,
                }
            });

            // Handle the response from the server
            console.log('Server response:', response.data);
        } catch (error) {
            console.error('Error during registration:', error.response.data);
            // Handle error (display error message, etc.)
        }
    };

    return (
        <>
            {error && error.status === 200 ? (
                <div>

                    <h2>Update Profile</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Username:
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                placeholder={user && user.username}
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
                                placeholder={user ? user.email : ''}
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
                            <img
                                src={user && user.imageUrl ? `http://localhost:3001${user.imageUrl}` : ''}
                                alt="user"
                                style={{ height: "30px", width: "30px" }}
                            />
                        </label>
                        <br />

                        <button type="submit">Update Profile</button>
                    </form>
                </div>
            ) : (
                <UnauthorizedPage />
            )}
        </>
    );

};

export default UpdateProfile;
