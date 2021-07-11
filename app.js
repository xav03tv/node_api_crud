const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser  =require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config();


const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

mongoose.connect("mongodb+srv://xav03:"+process.env.BDD_PASS+"@cluster0.lc5vk.mongodb.net/authentificator?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.use((req, res, next)=>{
    res.header("Access-Controll-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", 'Origin, X-Requested-Width, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({})
    }
    next();
});

//Routes qui manipulent la requete
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next)=>{
    const error = new Error("Not found");
    error.status = 404;
    next(error);
})


app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message
        }
    })
})


module.exports = app;