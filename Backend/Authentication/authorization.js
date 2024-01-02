
const { verifyToken } = require("./jwtUtils")
function protected(req, res, next) {
    // take the token from the headers of the request
    const token = req.headers.authorization;
    // console.log(token);
    if (token) {
        try {
            const decoded = verifyToken(token);
            req.user = decoded;
            console.log("Decoded: ", decoded, req.user);
            // console.log(decoded);
            next();
        } catch (error) {
            res.status(401).json({ error: 'Invalid token' });
        }
    } else {
        res.status(401).json({ error: 'Token missing' });
    }
}
function adminProtected(req, res, next) {
    // take the token from the headers of the request
    const token = req.headers.authorization;
    // console.log(token);
    if (token) {
        try {
            const decoded = verifyToken(token);
            req.user = decoded;
            if (decoded.role === 'Admin') {

                next();
            }
            else {
                res.status(401).json({ error: 'This is admin Protected Route' });
            }
        } catch (error) {
            res.status(401).json({ error: 'Invalid token' });
        }
    } else {
        res.status(401).json({ error: 'Token missing' });
    }
}

module.exports = { protected, adminProtected };