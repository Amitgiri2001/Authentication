const User = require("../Models/UserSchema");
const { generateToken } = require("./jwtUtils");
const { hashPassword, verifyPassword } = require("./bcrypt")



exports.register = async (req, res, next) => {

    let { username, password, email, role } = req.body;

    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    try {
        const imageUrl = `/uploads/${req.file.filename}`;
        password = await hashPassword(password);
        console.log("Hashed Password: " + password);
        // Create user with both form data and file data
        const user = await User.create({
            username,
            email,
            password,
            imageUrl,
            role
        });


        res.status(200).json({
            message: "User successfully created",
            user

        });
    } catch (err) {
        res.status(500).json({
            message: "User not successfully created",
            error: err.message,
        });
    }
};


exports.logIn = async function (req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
        res.send("User not found!")
    }
    else {
        const isPasswordMatch = await verifyPassword(password, user.password);
        if (!isPasswordMatch) {
            res.send("Password is incorrect")
        }
        else {

            // console.log(user)
            // Generate JWT token
            const token = generateToken({ userId: JSON.stringify(user._id), username: user.username, role: user.role });

            // Set HttpOnly cookie
            res.cookie('token', token, { httpOnly: true, secure: true });
            res.send({ message: "Successfully logged in", user: user, token: token });

        }
    }


}