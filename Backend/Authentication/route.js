const express = require("express")
const router = express.Router()
const { register, logIn } = require("./auth")
const upload = require("../multerConfig")
router.route("/register").post(upload.single('userImage'), register);
router.route("/login").post(logIn);
module.exports = router