const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentification');
const axios = require('axios');
const db = require('../knex.js');



router.get('/user', auth, async (req, res, next) => { //async => await axios obligé
    /*
        try{
            const result = await axios
                .get('http://localhost:3335/users',
                {
                    headers: {
    
                    }
                });
            
            res.json(result.data);
        }
        catch (error) {
            next(error);
        }
    */
    let user;
    let result;

    try {
        user = await db.select('u_id', 'pseudo', 'level', 'xp').from('user');
        result = {
            type: "collection",
            count: user.length,
            users: user
        }
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    };
});
//await return tout en meme temps (then?catch?..)


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


