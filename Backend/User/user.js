const express = require('express');

//import User model
const User = require("../Models/UserSchema")



//for deleting image before upload new image from the same user
const deleteImage = require("../deleteImage")




// /user
//GET->user profile data
module.exports.getUserData = async (req, res) => {
    try {
        const userId = req.params.userId;
        // console.log("UserId->" + userId);

        // Use Mongoose's findById method to find a user by _id
        const user = await User.findById(userId);

        // Do something with the data
        // console.log(user);

        if (user) {
            res.json({ message: "success", user: user });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//UPDATE->user profile
module.exports.updateUserData = async (req, res) => {
    try {
        //take userId from the url parameter
        const userIdToUpdate = req.params.userId;
        // console.log("UserId to update -> " + userIdToUpdate);

        //if user upload new file then delete the previous one
        if (req.file) {
            // User has selected a new image, handle the previous image
            const user = await User.findById(userIdToUpdate);
            //if previous image exists
            if (user && user.imageUrl) {
                await deleteImage(user.imageUrl);
            }

            // Set the new image URL for the updated user
            req.body.imageUrl = `/uploads/${req.file.filename}`;
        }
        //now update the user
        const updatedUser = await User.findByIdAndUpdate(userIdToUpdate, req.body, { new: true });

        if (updatedUser) {
            res.json({ status: "success", userData: updatedUser });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//DELETE->user profile
module.exports.deleteUserData = async (req, res) => {
    try {
        const userIdToDelete = req.params.userId;
        // console.log("UserId to delete->" + userIdToDelete);
        // delete the previous image
        const user = await User.findById(userIdToDelete);
        //if previous image exists
        if (user && user.imageUrl) {
            await deleteImage(user.imageUrl);
        }
        const deletedUser = await User.findByIdAndDelete(userIdToDelete);

        if (deletedUser) {
            res.json({ status: "successfully Deleted", userData: deletedUser });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



