const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/products');

router.get('/',(req, res, next)=>{
    Product.find()
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch( err => {
        console.log(err)
        res.status(500).json({
            "message" : err
        });
    });
})

router.post('/',(req, res, next)=>{
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price
    })
    product.save().then(result=>{
        console.log(result)
    })
    .catch(error=>{
        console.log(error)
    })
    res.status(200).json({
        message : 'Handling POST requests to /products',
        createdProduct : product
    })
})

router.get('/:productId', (req, res, next)=>{
    const id = req.params.productId;
    const ObjectID = mongoose.Types.ObjectId;
    if(ObjectID.isValid(id)){
        Product.findById(id)
   .exec()
   .then(doc => {
       console.log("From data base : ",doc)
       if(doc){
        res.status(200).json(doc)
       }else{
           res.status(404).json({message : "L'id n'est pas valide"})
       }
       
   })
   .catch(err=>{
       console.log(err);
       res.status(500).json({error : error});
    });
    }else{
        console.log("L'id n'est pas valide")
        res.status(500).json({error : "L'id n'est pas valide"});
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