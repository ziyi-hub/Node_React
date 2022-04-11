const express = require('express');
const db = require('../knex.js');
const uuid = require('uuid');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { json } = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    let commande;
    let result;

    try{
        commande = await db.select('id', 'mail', 'created_at', 'montant').from('commande');
        result = {
            type: "collection",
            count: commande.length,
            commandes: commande
        }
        res.status(200).json(result);
    }
    catch(error){
        res.status(500).json({
            type: "error",
            error: "500",
            message: "erreur lors de la connexion à la base de données"
        });
    };
});

router.post('/', async (req, res) => {
    let id = uuid.v4();
    let result;
    let items;
    let reqItem = JSON.parse(req.headers.items);
    let montant;
    let schema;
    let values;
    let commande;
    let nom = req.headers.nom;
    let livraison = JSON.parse(req.headers.livraison);
    let tokenCom = jwt.sign({nom}, 'my_secret_key', {algorithm: 'HS256', expiresIn: '20s'});
    
    try{
        items = await db("item").insert(
            reqItem.map(
                item => ({
                    uri: item.uri,
                    quantite: item.q,
                    libelle: item.libelle,
                    tarif: item.tarif,
                    command_id: id
                })
            )
        );

        montant = await db('item').columns([
            db.raw('sum(tarif * quantite) as total')]).where('command_id', '=', id);


        schema = Joi.object({
            nom: Joi.string()
                .min(1)
                .max(50)
                .required(),

            mail: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } }).required(),

            livraison: Joi.date().greater('now').iso().required(),

            /*items: Joi.array()
                .items(validator.object({
                    uri: Joi.string().required(),
                    quantite: Joi.number().required(),
                    libelle: Joi.string().required(),
                    tarif: Joi.number().required(),
                    command_id: Joi.string().required(),
                }))*/
        });

        values = await schema.validateAsync({
            nom: req.headers.nom,
            mail: req.headers.mail,
            livraison: livraison.date + ' ' + livraison.heure,
            /*items: reqItem.map(
                item => ({
                    uri: item.uri,
                    quantite: item.q,
                    libelle: item.libelle,
                    tarif: item.tarif,
                    command_id: id
                })
            )*/
        });
       
        commande = await db('commande').insert({
            id: id,
            created_at: db.raw('CURRENT_TIMESTAMP'),
            updated_at: db.raw('CURRENT_TIMESTAMP'),
            livraison: livraison.date + ' ' + livraison.heure,
            nom: req.headers.nom,
            mail: req.headers.mail,
            montant: montant[0].total,
            status: 1,
            token: tokenCom
        });
        
        result = await db.select("nom", "mail", "livraison", "id", "token", "montant").from('commande').where('id', '=', id);
       
        res.status(201).json({
            commande: result[0]
        });
    }
    catch(error){
        res.status(500).json({
            type: "error",
            error: "500",
            message: "erreur lors de la connexion à la base de données"
        });
    }
});

router.get('/:id', async (req, res) => {
    let id = req.params.id;
    let embed = req.query.embed;
    let tokenn = req.query.token;
    let commande;
    let commandeToken;
    let items;
    let result;

    try{
        commande = await db.select('id', 'nom', 'mail', 'created_at', 'livraison', 'montant' ).from('commande').where('id', '=', id);

        if(!commande[0])
        {
            res.status(404).json({
                type: "error",
                error: "404",
                message: "ressource non disponible : /commandes_db/" + id});
        }
        else{
            if(!embed && !tokenn)
            {
                /*if(req.header('X-lbs-token') == null)
                {
                    err = {
                        Erreur: "Le token ne peut pas être null. Vous devez ajouter un token dans le header !",
                    }
                    
                    res.status(400).json(err);
                }
                else{
                    jwt.verify(req.header('X-lbs-token'), 'my_secret_key', {maxAge: 60}, async function(err, decoded) {
                        if (err) {
                            err = {
                                Erreur: "Erreur lors de l'expiration token. Vous avez déjà dépassé la durée maximum du token (10 minutes).",
                            }
                        
                            res.status(404).json(err);
                        }
                        else{*/
                            result = {
                                type: "resource",
                                commande: {
                                    id: commande[0].id,
                                    mail: commande[0].mail,
                                    nom: commande[0].nom,
                                    date_commande: commande[0].created_at,
                                    date_livraison: commande[0].livraison,
                                    montant: commande[0].montant,
                                    status: 'ok'
                                }
                            }
                            res.status(200).json(result, [
                                {
                                    items: {
                                        href: "http://localhost:3333/commandes/" + commande[0].id + "/items"
                                    },
                                    self : {
                                        href: "http://localhost:3333/commandes/" + commande[0].id
                                    }
                                }
                            ]);
                        /*}
                    });
                }*/
            }
            else if(embed){

                items = await db.select('id', 'libelle', 'tarif', 'quantite').from('item').where('command_id', '=', commande[0].id);

                result = {
                    type: "resource",
                    commande: {
                        id: commande[0].id,
                        mail: commande[0].mail,
                        nom: commande[0].nom,
                        date_commande: commande[0].created_at,
                        date_livraison: commande[0].livraison,
                        montant: commande[0].montant,
                        items: items
                    }
                }
                res.status(200).json(result, [
                    {
                        items: {
                            href: "http://localhost:3333/commandes/" + commande[0].id + "/items"
                        },
                        self : {
                            href: "http://localhost:3333/commandes/" + commande[0].id
                        }
                    }
                ]);
            }
            else if(tokenn){

                jwt.verify(tokenn, 'my_secret_key', {maxAge: 600}, async function(err, decoded) {
                    if (err) {
                        err = {
                          Erreur: "Erreur lors de l'expiration token. Vous avez déjà dépassé la durée maximum du token (10 minutes).",
                        }
                      
                        res.status(404).json(err);
                    }
                    else{
                        items = await db.select('id', 'libelle', 'tarif', 'quantite').from('item').where('command_id', '=', commande[0].id);
                        commandeToken = await db.select('id', 'nom', 'mail', 'created_at', 'livraison', 'montant' ).from('commande').where('token', '=', tokenn);

                        result = {
                            type: "resource",
                            commande: {
                                id: commandeToken[0].id,
                                mail: commandeToken[0].mail,
                                nom: commandeToken[0].nom,
                                date_commande: commandeToken[0].created_at,
                                date_livraison: commandeToken[0].livraison,
                                montant: commandeToken[0].montant,
                                items: items
                            }
                        }
                        res.status(200).json(result, [
                            {
                                items: {
                                    href: "http://localhost:3333/commandes/" + commande[0].id + "/items"
                                },
                                self : {
                                    href: "http://localhost:3333/commandes/" + commande[0].id
                                }
                            }
                        ]);
                    }
                });
            }
        }
    }
    catch(error){
        res.status(500).json({
            type: "error",
            error: "500",
            message: "erreur lors de la connexion à la base de données"
        });
    };
});


router.put('/:id', async (req, res) => {
    let id = req.params.id;
    let commande;
    let update;
    let livraison = JSON.parse(req.headers.livraison);

    try{
        commande = await db.select('id', 'nom', 'mail', 'created_at', 'livraison', 'montant' ).from('commande').where('id', '=', id);

        if(!commande[0])
        {
            res.status(404).json({
                type: "error",
                error: "404",
                message: "ressource non disponible : /commandes_db/" + id});
        }
        else{
            update = await db.select('id', 'nom', 'mail', 'created_at', 'livraison', 'montant' ).from('commande').where('id', '=', id).update({
                nom: req.headers.nom,
                mail: req.headers.mail,
                livraison: livraison.date + ' ' + livraison.heure
            });
            res.status(204).json('success');
        }
    }
    catch(error){
        res.status(500).json({
            type: "error",
            error: "500",
            message: "erreur lors de la connexion à la base de données"
        });
    };
});

router.get('/:id/items', async (req, res) => {
    let id = req.params.id;
    let commande;
    let items;
    let result;

    try {
        commande = await db.select("*").from('commande').where("id", "=", id);

        if(!commande[0])
        {
            res.status(404).json({
                type: "error",
                error: "404",
                message: "ressource non disponible : /commandes_db/" + id});
        }
        else{
            items = await db.select('id', 'libelle', 'tarif', 'quantite').from('item').where('command_id', '=', commande[0].id);
            result = {
                type: "collection",
                count: items.length,
                items: items
            }
            res.status(200).json(result);
        }
    }
    catch(error){
        res.status(500).json({
            type: "error",
            error: "500",
            message: "erreur lors de la connexion à la base de données"});
    }

});


router.get("*", (req,res)=>{
    res.status(400).json({
        type: "error",
        error: "400",
        message: "la requête " + req.url + " est mal formée"});
});


/*router.use((req, res)=>{
    res.json({
        type: "error",
        error: "405",
        message: "erreur de type 405 Method Not Allowed"
    })
});*/

module.exports = router;


