const express = require('express');
const router = express.Router();
const User = require('../Models/UserSchema')

router.get('/users', async (req, res) => {
    try {
        // Use Mongoose's find method to get all users
        const users = await User.find({});

        // Do something with the data
        // console.log(users);

        res.json({ message: "success", users: users });
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
