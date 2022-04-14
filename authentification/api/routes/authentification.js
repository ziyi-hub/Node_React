const db = require('../knex.js');
const uuid = require('uuid');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//authentification, création du jwt token
router.post('/signin', async (req, res) => {
    let users;
    let user;

    try {
        if (req.headers.authorization) {

            let pseudo = req.headers.pseudo;
            let password = req.headers.password;


            users = await db.select('pseudo', 'password').from('user');

            user = users.find(u => u.pseudo === pseudo);

            bcrypt.compare(password, user.password, async function (err, result) {
                if (result) {
                    token = jwt.sign({ pseudo }, 'my_secret_key', { algorithm: 'HS256', expiresIn: '600000s' });

                    return res.status(201).json({
                        token: token
                    });
                } else {
                    return res.status(401).json({
                        error: "Bad credentials"
                    })
                }
            });
        }
        else {
            return res.status(401).json({
                error: "Missing credential"
            })
        }
    }
    catch (error) {
        res.status(500).json({
            type: "error",
            error: "500",
            message: "erreur lors de la connexion à la base de données"
        });
    }
});

//inscription
router.post('/signup', async (req, res) => {

    let nom = req.body.pseudo

    try {
        if (req.headers.parrain) {
            let user = await db("user").insert({
                pseudo: req.headers.pseudo,
                email: req.headers.email,
                password: await bcrypt.hash(req.headers.password, 12), //,12 veut dire qu'on effectue 12 fois le cryptage
                parrain: req.headers.parrain
            });
        }
        else {
            let user = await db("user").insert({
                pseudo: req.headers.pseudo,
                email: req.headers.email,
                password: await bcrypt.hash(req.headers.password, 12), //,12 veut dire qu'on effectue 12 fois le cryptage
            });
        }



        token = jwt.sign({ nom }, 'my_secret_key', { algorithm: 'HS256', expiresIn: '600s' });

        return res.status(201).json({
            user: req.headers.nom,
            token: token
        });
    }
    catch (error) {
        res.status(500).json({
            type: "error",
            error: "500",
            message: "erreur lors de la connexion à la base de données"
        });
    }
});

module.exports = router;


