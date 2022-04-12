const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (authHeader) {

        jwt.verify(authHeader, 'my_secret_key', (err, user) => {
            if(err)
            {
                res.status(403).json({
                    error: "Not Authorized",
                });
                throw new Error("Not Authorized");
            }
            req.user = user;
            next(err);
        });
    } else {
        res.status(401).json({
            error: "Header 'Autorization' requis"
        });
        throw new Error("Header 'Autorization' requis");
    }
};

module.exports = authenticateJWT;