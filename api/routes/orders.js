const express = require('express');
const router = express.Router();

router.get('/',(req, res, next)=>{
    res.status(200).json({
        message : "commande en cours"
    })
})

router.post('/',(req, res, next)=>{
    res.status(201).json({
        message : "commande ajoutée"
    })
})

router.get('/:orderId',(req, res, next)=>{
    res.status(200).json({
        message : "Détails de la commande",
        orderId : req.params.orderId
    })
})

router.delete('/:orderId',(req, res, next)=>{
    res.status(200).json({
        message : "Suppression de la commande",
        orderId : req.params.orderId
    })
})




module.exports = router;