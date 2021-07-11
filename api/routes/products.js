const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/products');

router.get('/',(req, res, next)=>{
    Product.find()
    .exec()
    .then(docs => {
        console.log(docs);
        // if(docs.length >=0){
            res.status(200).json(docs);
        // }else{
        //     res.status(404).json({
        //         message : "Aucun contenu"
        //     })
        // }
    })
    .catch( err => {
        console.log(err)
        res.status(500).json({
            "error" : err
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
       res.status(500).json({error : err});
    });
  
   
})

//Mise à jour des produits
router.patch('/:productId', (req, res, next)=>{
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.updateOne({_id : req.params.productId},{$set: updateOps})
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error : err
        })
    });

})

router.delete('/:productId', (req, res, next)=>{
    Product.remove({
        _id : req.params.productId
    })
    .exec()
    .then(result =>{
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err),
        res.status(500).json({
            error : err
        })
    })
})

module.exports = router;