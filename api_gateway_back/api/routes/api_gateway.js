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
    try { //verif que le token est le meme pour éviter que tout le monde récupère les informations des autres
        if (tokenData.idUser == req.params.id) { //si l'id du token correspond a celui de la requête (pour etre sur que c'est bien la personne qui fait la requete)

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


// Modifier xp
router.put('/user/:id/xp', auth, async (req, res, next) => { //:id = parametre, recupérable par req.params

    const accessToken = req.headers["authorization"]; //recup access token dans le header
    const tokenData = jwt.decode(accessToken); // décode le token
    try { //verif que le token est le meme pour éviter que tout le monde récupère les informations des autres
        if (tokenData.idUser == req.params.id) { //si l'id du token correspond a celui de la requête (pour etre sur que c'est bien la personne qui fait la requete)

            try {
                if (req.body.xp > 0) {
                    let userXp = await db.select('xp').from('user').where('u_id', '=', req.params.id);
                    await db
                        .select('xp')
                        .from('user').where('u_id', '=', req.params.id)
                        .update({
                            xp: userXp[0].xp + req.body.xp,
                        });
                    res.status(204).json('success');
                } else {
                    res.status(401).json({
                        error: "xp doit positive"
                    })
                }

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


// Modifier koin
router.put('/user/:id/koins', auth, async (req, res, next) => { //:id = parametre, recupérable par req.params

    const accessToken = req.headers["authorization"]; //recup access token dans le header
    const tokenData = jwt.decode(accessToken); // décode le token
    try { //verif que le token est le meme pour éviter que tout le monde récupère les informations des autres
        if (tokenData.idUser == req.params.id) { //si l'id du token correspond a celui de la requête (pour etre sur que c'est bien la personne qui fait la requete)

            try {
                if (req.body.koins > 0) {
                    let userKoins = await db.select('koins').from('user').where('u_id', '=', req.params.id);
                    await db
                        .select('koins')
                        .from('user').where('u_id', '=', req.params.id)
                        .update({
                            koins: userKoins[0].koins + req.body.koins,
                        });
                    res.status(204).json('success');
                } else {
                    res.status(401).json({
                        error: "koins doit positive"
                    })
                }
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


// incrémenter un level
router.put('/user/:id/level', auth, async (req, res, next) => { //:id = parametre, recupérable par req.params

    const accessToken = req.headers["authorization"]; //recup access token dans le header
    const tokenData = jwt.decode(accessToken); // décode le token
    try { //verif que le token est le meme pour éviter que tout le monde récupère les informations des autres
        if (tokenData.idUser == req.params.id) { //si l'id du token correspond a celui de la requête (pour etre sur que c'est bien la personne qui fait la requete)

            try {
                let userLevel = await db.select('level').from('user').where('u_id', '=', req.params.id);
                await db
                    .select('level')
                    .from('user').where('u_id', '=', req.params.id)
                    .update({
                        level: userLevel[0].level + 1,
                    });
                res.status(204).json('success');
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



// incrémenter un logoutWin
router.put('/user/:id/logoutWin', auth, async (req, res, next) => { //:id = parametre, recupérable par req.params

    const accessToken = req.headers["authorization"]; //recup access token dans le header
    const tokenData = jwt.decode(accessToken); // décode le token
    try { //verif que le token est le meme pour éviter que tout le monde récupère les informations des autres
        if (tokenData.idUser == req.params.id) { //si l'id du token correspond a celui de la requête (pour etre sur que c'est bien la personne qui fait la requete)
            try {
                let userLogoutWin = await db.select('logoutWin').from('user').where('u_id', '=', req.params.id);
                await db
                    .select('logoutWin')
                    .from('user').where('u_id', '=', req.params.id)
                    .update({
                        logoutWin: userLogoutWin[0].logoutWin + 1,
                    });
                res.status(204).json('success');
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


// incrémenter un winsVsIA
router.put('/user/:id/winsVsIA', auth, async (req, res, next) => { //:id = parametre, recupérable par req.params

    const accessToken = req.headers["authorization"]; //recup access token dans le header
    const tokenData = jwt.decode(accessToken); // décode le token
    try { //verif que le token est le meme pour éviter que tout le monde récupère les informations des autres
        if (tokenData.idUser == req.params.id) { //si l'id du token correspond a celui de la requête (pour etre sur que c'est bien la personne qui fait la requete)

            try {
                let userWinsVsIA = await db.select('winsVsIA').from('user').where('u_id', '=', req.params.id);
                await db
                    .select('winsVsIA')
                    .from('user').where('u_id', '=', req.params.id)
                    .update({
                        winsVsIA: userWinsVsIA[0].winsVsIA + 1,
                    });
                res.status(204).json('success');
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


//Achat d'un pack king
//incrémenter de 1 et retirer le nbr de credit, verif qu'il a le nombre de crédit + le bon jwt
router.put('/user/:id/king', auth, async (req, res, next) => {
    let kingUser;
    let user;
    let nbrKoinsUser = await db.select("koins").from("user").where("u_id", req.params.id); //recup le nbr de koins de l'user
    let priceKingPack = 5000; //prix du pack

    const accessToken = req.headers["authorization"]; //recup access token dans le header
    const tokenData = jwt.decode(accessToken); // décode le token
    if (tokenData.idUser == req.params.id) { //si l'id du token correspond a celui de la requête (pour etre sur que c'est bien la personne qui fait la requete)
        if (nbrKoinsUser[0].koins >= priceKingPack) {
            try {
                kingUser = await db.select("king").from("user").where("u_id", req.params.id); //nbr de king de l'user
                user = await db("user").where("u_id", req.params.id).update({
                    king: kingUser[0].king + 1, //incrémente de 1 quand il achete le pack
                    koins: nbrKoinsUser[0].koins - priceKingPack
                });
            }
            catch (error) {
                next(error);
            };
            res.status(204).json("Pack successfully buyed");
        }
        else {
            res.status(403).json({
                error: "Koins insuffisants!"
            })
        }
    }
    else {
        res.status(403).json({
            error: "Access token invalide, vous n'avez pas les droits!"
        });
    }

});


//Achat d'un pack event
//incrémenter de 1 et retirer le nbr de credit, verif qu'il a le nombre de crédit + le bon jwt
router.put('/user/:id/event', auth, async (req, res, next) => {
    let eventUser;
    let user;
    let nbrKoinsUser = await db.select("koins").from("user").where("u_id", req.params.id); //recup le nbr de koins de l'user
    let priceEventPack = 3000; //prix du pack

    const accessToken = req.headers["authorization"]; //recup access token dans le header
    const tokenData = jwt.decode(accessToken); // décode le token
    if (tokenData.idUser == req.params.id) { //si l'id du token correspond a celui de la requête (pour etre sur que c'est bien la personne qui fait la requete)
        if (nbrKoinsUser[0].koins >= priceEventPack) {
            try {
                eventUser = await db.select("event").from("user").where("u_id", req.params.id); //nbr de event de l'user
                user = await db("user").where("u_id", req.params.id).update({
                    event: eventUser[0].event + 1, //incrémente de 1 quand il achete le pack
                    koins: nbrKoinsUser[0].koins - priceEventPack
                });
            }
            catch (error) {
                next(error);
            };
            res.status(204).json("Pack successfully buyed");
        }
        else {
            res.status(403).json({
                error: "Koins insuffisants!"
            })
        }
    }
    else {
        res.status(403).json({
            error: "Access token invalide, vous n'avez pas les droits!"
        });
    }

});




//Achat d'un pack claw
//incrémenter de 1 et retirer le nbr de credit, verif qu'il a le nombre de crédit + le bon jwt
router.put('/user/:id/claw', auth, async (req, res, next) => {
    let clawUser;
    let user;
    let nbrKoinsUser = await db.select("koins").from("user").where("u_id", req.params.id); //recup le nbr de koins de l'user
    let priceClawPack = 2000; //prix du pack

    const accessToken = req.headers["authorization"]; //recup access token dans le header
    const tokenData = jwt.decode(accessToken); // décode le token
    if (tokenData.idUser == req.params.id) { //si l'id du token correspond a celui de la requête (pour etre sur que c'est bien la personne qui fait la requete)
        if (nbrKoinsUser[0].koins >= priceClawPack) {
            try {
                clawUser = await db.select("claw").from("user").where("u_id", req.params.id); //nbr de claw de l'user
                user = await db("user").where("u_id", req.params.id).update({
                    claw: clawUser[0].claw + 1, //incrémente de 1 quand il achete le pack
                    koins: nbrKoinsUser[0].koins - priceClawPack
                });
            }
            catch (error) {
                next(error);
            };
            res.status(204).json("Pack successfully buyed");
        }
        else {
            res.status(403).json({
                error: "Koins insuffisants!"
            })
        }
    }
    else {
        res.status(403).json({
            error: "Access token invalide, vous n'avez pas les droits!"
        });
    }

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
    try { //verif que le token est le meme pour éviter que tout le monde récupère les informations des autres
        if (tokenData.idUser == req.params.id) { //si l'id du token correspond a celui de la requête (pour etre sur que c'est bien la personne qui fait la requete)
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
    let result;

    try {

        if (req.body.parrain) { // si il a rentré un parrain
            const boolParrain = await db.select("*").from("user").where("pseudo", req.body.parrain); //verifie que le parrain existe
            if (boolParrain[0] != null) { //si il existe:
                result = await axios
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
            else { //parrain existe pas = erreur faut recommencer
                result = { error: "Ce parrain n'existe pas!" } //envoie une erreur pour authentification.js
                res.status(401).json({
                    error: "Ce parrain n'existe pas!"
                })
            }
        }
        else { //si pas de parrain
            result = await axios
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
    catch (error) { //si erreur lors de l'envois du json
        res.status(401).json({
            error: "Bad credentials"
        })
        next(error);
    }
});



//infirmary --------------

//Ajout d'une carte dans l'infirmary d'une user


router.post('/user/:id/infirmary/add', async (req, res, next) => {

    const auth = req.headers['authorization'];
    let result;

    try {

        if (req.body.parrain) { // si il a rentré un parrain
            const boolParrain = await db.select("*").from("user").where("pseudo", req.body.parrain); //verifie que le parrain existe
            if (boolParrain[0] != null) { //si il existe:
                result = await axios
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
            else { //parrain existe pas = erreur faut recommencer
                result = { error: "Ce parrain n'existe pas!" } //envoie une erreur pour authentification.js
                res.status(401).json({
                    error: "Ce parrain n'existe pas!"
                })
            }
        }
        else { //si pas de parrain
            result = await axios
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
    catch (error) { //si erreur lors de l'envois du json
        res.status(401).json({
            error: "Bad credentials"
        })
        next(error);
    }
});
















//export router
module.exports = router;
