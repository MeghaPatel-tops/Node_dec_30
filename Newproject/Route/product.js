var express = require('express');
var Router = express.Router();
const Auth = require('../Middleware/Auth');
var productController= require('../Controller/ProductController');
//const Auth = require('../Middleware/Auth');


Router.get('/',(req,res)=>{
    productController.getFakeProduct(req,res,(data,err)=>{
        if(data){
           // console.log(data);
            res.render('product/index.hbs',{"product":data});

        }
        else{
            res.status(500).json({"msg":"something wrong"});
        }
    });
    
})

Router.get('/addtocart/:pid',(req,res)=>{
    productController.addtocart(req,res,(data,err)=>{
        if(data){
            console.log(data);
            res.json(data);

        }
        else{
            res.status(500).json({"msg":"something wrong"});
        }
    })
})

module.exports=Router