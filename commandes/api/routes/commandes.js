const express = require('express');
const db = require('../knex.js');
const uuid = require('uuid');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { json } = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    let user;
    let result;

    try{
        user = await db.select('u_id', 'pseudo', 'level', 'xp').from('user');
        result = {
            type: "collection",
            count: user.length,
            users: user
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


router.get("*", (req,res)=>{
    res.status(400).json({
        type: "error",
        error: "400",
        message: "la requête " + req.url + " est mal formée"});
});


module.exports = router;


