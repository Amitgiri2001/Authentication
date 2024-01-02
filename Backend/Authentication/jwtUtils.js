// jwtUtils.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (payload) => {
    // console.log(process.env.JWT_SECRET, payload)
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2d' });
};

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
        return decoded;
    } catch (error) {
        throw new Error('Invalid token');
    }
};

module.exports = { generateToken, verifyToken };
