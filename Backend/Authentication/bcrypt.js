const bcrypt = require('bcrypt');
require('dotenv').config();

// Function to hash a password
async function hashPassword(password) {

    const saltRounds = Number(process.env.SALT); // Number of salt rounds (affects the hashing complexity)

    try {
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    } catch (error) {
        throw error;
    }
}

// Function to verify a password
async function verifyPassword(enteredPassword, hashedPassword) {
    try {
        const match = await bcrypt.compare(enteredPassword, hashedPassword);
        return match;
    } catch (error) {
        throw error;
    }
}

// Example usage
async function exampleUsage() {
    const plainPassword = 'userEnteredPassword';

    // Hash the password during user registration
    const hashedPassword = await hashPassword(plainPassword);

    console.log('Hashed Password:', hashedPassword);

    // Verify the password during login
    const isPasswordMatch = await verifyPassword('userEnteredPassword', hashedPassword);

    if (isPasswordMatch) {
        console.log('Password is correct');
        // console.log(isPasswordMatch.toString());
    } else {
        console.log('Password is incorrect');
    }
}

// exampleUsage();

module.exports = {
    hashPassword,
    verifyPassword
}