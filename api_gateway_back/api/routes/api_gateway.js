const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentification');
const axios = require('axios');



router.get('/suivi/commandes', auth, async (req, res, next) => {
    res.json("ok");

    /*
    try{
        const result = await axios
            .get('http://localhost:3335/commandes',
            {
                headers: {
                    //data: JSON.stringify(data)
                }
            });
        
        res.json(result);
    }
    catch(error){
        next(error);
    }
     */
});



router.post('/auth/signin', async (req, res, next) => {

    const auth = req.headers['authorization'];

    try {
        const result = await axios
           .post('http://authentification:3000/auth/signin',  {},
               {
                   headers: {
                        'Authorization': `${auth}`,
                   }
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

router.post('/auth/signup', async (req, res, next) => {
    
    const auth = req.headers['authorization'];

    try {
        const result = await axios
            .post('http://authentification:3000/auth/signup',  {},
            {
                headers: {
                    'Authorization': `${auth}`,
                    'nom' : req.body.nom_client,
                    'passwd' : req.body.passwd,
                    'mail' : req.body.mail_client
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


