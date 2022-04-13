const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentification');
const axios = require('axios');
const db = require('../knex.js');
const bcrypt = require('bcryptjs');


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


//Récupérer toutes les cartes
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


router.put('/user/:id', async (req, res, next) => {

    try{
        if(req.headers.pseudo){
            await db
                .select('id')
                .from('user').where('id', '=', req.params.id)
                .update({
                    pseudo: req.headers.pseudo,
                });
            res.status(204).json('success');
        }else if(req.headers.email){
            await db
                .select('id')
                .from('user').where('id', '=', req.params.id)
                .update({
                    email: req.headers.email,
                });
            res.status(204).json('success');
        }else if(req.headers.password){
            await db
                .select('id')
                .from('user').where('id', '=', req.params.id)
                .update({
                    password: await bcrypt.hash(req.headers.password, 12),
                });
            res.status(204).json('success');
        }
    }
    catch(error){
        next(error);
    };
});


/**
 * S'inscrire
 */
router.post('/auth/signup', async (req, res, next) => {

    const auth = req.headers['authorization'];

    try {
        const result = await axios
            .post('http://authentification:3000/auth/signup', {},
                {
                    headers: {
                        'Authorization': `${auth}`,
                        'pseudo': req.body.pseudo,
                        'email': req.body.email,
                        'password': req.body.password,
                        'event': req.body.event,
                        'claw': req.body.claw,
                        'king': req.body.king,
                        'exchange': req.body.exchange,
                        'rewardLevel': req.body.rewardLevel,
                    },
                });

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


