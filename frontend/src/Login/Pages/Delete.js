import React from 'react'
import axios from 'axios';
import { useAuth } from "../../AuthProvider"
const Delete = () => {

    const { authToken, logout, userId } = useAuth();
    const handleClick = async () => {


        const response = await axios.delete(`/user/${userId}`, {
            headers: {
                'Authorization': authToken,
            }
        });

        // call logout as well
        logout()


        // console.log(response)
        console.log("User Delete Success");
    };
    return (
        <div><button onClick={handleClick}>Delete</button></div>
    )
}

export default Delete
