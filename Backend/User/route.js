const express = require('express');
const router = express.Router();
//use multer for upload images
const upload = require("../multerConfig")

// verify token
const { verifyToken } = require("../Authentication/jwtUtils")

// functions
const { getUserData, updateUserData, deleteUserData } = require("./user")

router.route('/:userId').get(getUserData);
router.route('/:userId').put(upload.single('userImage'), updateUserData);
router.route('/:userId').delete(deleteUserData);



module.exports = router