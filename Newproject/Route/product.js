var express = require('express');
var dotenv= require('dotenv').config();
var Router = express.Router();
const Auth = require('../Middleware/Auth');
var productController= require('../Controller/ProductController');
//const Auth = require('../Middleware/Auth');
const Razorpay = require('razorpay')

Router.post('/payment',async(req,res)=>{
    productController.paymentAdd(req,res,(data,err)=>{
        if(data){
            res.send(data);
        }
    })
})
Router.post('/order', async (req, res) => {
    console.log(process.env.razorpay_keyId);
    console.log(process.env.razorpaysecret)
    // initializing razorpay
    const razorpay = new Razorpay({
        key_id: process.env.razorpay_keyId,
        key_secret: process.env.razorpaysecret
    });

    // setting up options for razorpay order.
    const options = {
        amount: req.body.amount*100,
        currency: "INR",
        receipt: "any unique id for every order",
        payment_capture: 1
    };
    try {
        const response = await razorpay.orders.create(options)
        res.json({
            order_id: response.id,
            currency: response.currency,
            amount: response.amount,
        })
    } catch (err) {
       res.status(400).send('Not able to create order. Please try again!');
    }
});

Router.get('/',Auth,(req,res)=>{
    productController.getFakeProduct(req,res,(data,err)=>{
        if(data){
           // console.log(data);
            res.render('product/index.hbs',{"product":data});

        }
        else{
            res.status(500).json({"msg":"something wrong",err});
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

Router.get('/viewcart',Auth,(req,res)=>{
    productController.ViewCart(req,res,(data,err)=>{
        if(data){
            console.log(data)
            res.render('Product/viewcart.hbs',{cartdata:data})
        }
        else{
            res.status(500).json(err);
        }
    })
})

Router.post('/cartupdate',(req,res)=>{
    productController.updateCart(req,res,(data,err)=>{
        if(data){
            res.json({"msg":"success","data":data});
        }
    })
})


module.exports=Router