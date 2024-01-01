// app.js
const express = require('express');
require('dotenv').config();

const https = require('https');
const fs = require('fs');
const cookieParser = require('cookie-parser');
//using cors for Frontend and backend connection if they are in different domain
const cors = require('cors');

// Connect to MongoDB
const { connectToMongoDB } = require("./mongodb");
connectToMongoDB();

//import all route
const userRouter = require('./User/route');
const authRouter = require("./Authentication/route");
const usersRouter = require("./Admin/users")

// Authorization
const { protected, adminProtected } = require("./Authentication/authorization");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
// user middleware for parse json data
app.use(express.json());
//for  an HttpOnly cookie
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

// for authentication
app.use("/api/auth", authRouter);

//for user profile updating
//make this protected later
app.use("/user", protected, userRouter);

//for getting all user details
app.use("/admin", adminProtected, usersRouter);



// const sslOptions = {
//     key: fs.readFileSync('path/to/private-key.pem'),
//     cert: fs.readFileSync('path/to/certificate.pem'),
// };

// const server = https.createServer(sslOptions, app);
//server setup
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
