const express = require('express');
const router = express.Router();

router.get('/',(req, res, next)=>{
    res.status(200).json({
        message : 'Handling GET requests to /products'
    })
})

router.post('/',(req, res, next)=>{
    res.status(200).json({
        message : 'Handling POST requests to /products'
    })
})

router.get('/:productId', (req, res, next)=>{
    const id = req.params.productId;
    if(id === 'special'){
        res.status(200).json({
            message : 'Tu as découvert l id Special',
            id : id
        })
    }else{
        res.status(200).json({
            message : "Tu as passé un ID"
        })
    }
})

router.patch('/:productId', (req, res, next)=>{
    res.status(200).json({
        message: 'Le produit est mis à jour!'
    })
})

router.delete('/:productId', (req, res, next)=>{
    res.status(200).json({
        message: 'Le produit a été supprimé !'
    })
})

module.exports = router;