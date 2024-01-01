
const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    },
    role: {
        type: String,
        default: "Basic",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    imageUrl: {
        type: String,
    }
})
const UserData = mongoose.model("User", UserSchema)
//this will generate a collection name called users
module.exports = UserData