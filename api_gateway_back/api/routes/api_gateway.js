const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentification');
const axios = require('axios');
const db = require('../knex.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



//Récupérer la liste des users
router.get('/users', auth, async (req, res, next) => { //async => await axios obligé

    let users;
    let result;

    try {
        users = await db.select('u_id', 'pseudo', 'level', 'xp').from('user');
        result = {
            type: "collection",
            count: users.length,
            users: users
        }
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    };
});
//await return tout en meme temps (then?catch?..)


//Récupérer un seul utilisateur
router.get('/user/:id', auth, async (req, res, next) => { //:id = parametre, recupérable par req.params
    let user;
    let result;



    const accessToken = req.headers["authorization"]; //recup access token dans le header
    const tokenData = jwt.decode(accessToken); // décode le token
    const userPseudoParam = await db.select('pseudo').from('user').where('u_id', req.params.id); //prend le pseudo de l'utilisateur de l'id de la requête
    try { //verif que le token est le meme pour éviter que tout le monde récupère les informations des autres
        if (tokenData.pseudo == userPseudoParam[0].pseudo) { //si le pseudo de l'access token correspond au pseudo de l'id de la requête

            try {
                user = await db.select('*').from('user').where('u_id', req.params.id); //par défaut dans where '=', mais tu peux remplacer par '<' ou '>' ...
                result = {
                    type: "collection",
                    count: user.length,
                    user: user
                }
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            };
        }
        else {
            res.status(403).json({
                error: "Access token invalide, vous n'avez pas les droits!"
            }
            );
        }
    }
    catch (error) {
        next(error);
    };
});

//Récupérer le deck d'un utilisateur
router.get('/user/:id/deck', auth, async (req, res, next) => {
    let deck;
    let result;

    try {
        deck = await db.select('*').from('ukards').where('UserID', req.params.id);
        result = {
            type: "deck",
            count: deck.length,
            deck: deck
        }
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    };
});

//Récupérer toutes les cartes
router.get('/cards', auth, async (req, res, next) => {
    let cards;
    let result;

    try {
        cards = await db.select('*').from('kard');
        result = {
            type: "collection",
            count: cards.length,
            cards: cards
        }
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    };
});


//Récupérer une carte précise
router.get('/card/:id', auth, async (req, res, next) => {
    let card;
    let result;

    try {
        card = await db.select('*').from('kard').where('id', req.params.id);
        result = {
            type: "collection",
            count: card.length,
            card: card
        }
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    };
});

//se connecter
router.post('/auth/signin', async (req, res, next) => {

    const auth = req.headers['authorization'];

    try {
        const result = await axios
            .post('http://authentification:3000/auth/signin', {},
                {
                    headers: {
                        'Authorization': `${auth}`,
                        'pseudo': req.body.pseudo,
                        'password': req.body.password,
                    }
                });

        res.json(result.data);
    }
    catch (error) {
        res.status(401).json({
            error: "Bad credentials"
        })
        next(error); //utiliser au lieu de then/catch..
    }

});



//modifier les informations d'un utilisateur (pseudo,email,mot de passe)
router.put('/user/:id', auth, async (req, res, next) => {
    //les parametres passent dans le body
    //Récupérer le pseudo de l'access token, si le pseudo == req.params.pseudo alors faire tout ca, sinon erreur

    const accessToken = req.headers["authorization"]; //recup access token dans le header
    const tokenData = jwt.decode(accessToken); // décode le token
    const userPseudoParam = await db.select('pseudo').from('user').where('u_id', req.params.id); //prend le pseudo de l'utilisateur de l'id de la requête
    try {
        if (tokenData.pseudo == userPseudoParam[0].pseudo) { //si le pseudo de l'access token correspond au pseudo de l'id de la requête
            try { //rajouter des if verif si pseudo existe pas deja...
                if (req.body.pseudo) {

                    //permet de check si un pseudo existe déjà dans la base de données
                    const bool = await db.select('pseudo').from('user').where('pseudo', req.body.pseudo);
                    if (bool[0] != null) { //si le pseudo est trouvé et donc existe alors true sinon false
                        res.status(403).json({
                            error: "Ce pseudo existe déjà!"
                        });
                    }
                    else {


                        await db
                            .select('id')
                            .from('user').where('u_id', '=', req.params.id)
                            .update({
                                pseudo: req.body.pseudo,
                            });
                        res.status(204).json('success');
                    }
                }
                if (req.body.email) {
                    //permet de check si un mail existe déjà dans la base de données
                    const bool = await db.select('email').from('user').where('email', req.body.email);
                    if (bool[0] != null) { //si le mail est trouvé et donc existe alors true sinon false
                        res.status(403).json({
                            error: "Cette email existe déjà!"
                        });
                    }
                    else {

                        await db
                            .select('id')
                            .from('user').where('u_id', '=', req.params.id)
                            .update({
                                email: req.body.email,
                            });
                        res.status(204).json('success');
                    }
                } if (req.body.password) {
                    await db
                        .select('id')
                        .from('user').where('u_id', '=', req.params.id)
                        .update({
                            password: await bcrypt.hash(req.body.password, 12), //crypter le nouveau mot de passe
                        });
                    res.status(204).json('success');
                }
            }
            catch (error) {
                next(error);
            };
        }
        else {
            res.status(403).json({
                error: "Access token invalide!"
            }
            );
        }
    }
    catch (error) {
        next(error);
    };
});


/**
 * S'inscrire
 */
router.post('/auth/signup', async (req, res, next) => {

    const auth = req.headers['authorization'];

    try {

        if (req.body.parrain) {
            const result = await axios
                .post('http://authentification:3000/auth/signup', {},
                    {
                        headers: {
                            'Authorization': `${auth}`,
                            'pseudo': req.body.pseudo,
                            'email': req.body.email,
                            'password': req.body.password,
                            'parrain': req.body.parrain
                        },
                    });
        }
        else {
            const result = await axios
                .post('http://authentification:3000/auth/signup', {},
                    {
                        headers: {
                            'Authorization': `${auth}`,
                            'pseudo': req.body.pseudo,
                            'email': req.body.email,
                            'password': req.body.password,
                        },
                    });
        }


        res.json(result.data);
    }
    catch (error) {
        res.status(401).json({
            error: "Bad credentials"
        })
        next(error);
    }
});

module.exports = router;


