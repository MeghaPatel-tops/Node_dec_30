var express = require('express');
var dotenv= require('dotenv').config();
var Router = express.Router();
var apiRoute= require('../Controller/RestController');
var Apiauth = require('../Middleware/Apiauth');

Router.get('/',(req,res)=>{
    res.json("welcome to api route");
})

Router.post('/registration',(req,res)=>{
    apiRoute.UserRegisration(req,res,(data,err)=>{
        if(data){
            res.status(200).json({"msg":"successfully added","user":data,"status":1});
        }
        else{
            res.status(500).json({"msg":"something wrong","error":err});
        }
    });
})

Router.post('/login',(req,res)=>{
    apiRoute.Login(req,res,(data,err)=>{
        if(data){
            res.status(200).json(data);
        }
        else{
            res.status(500).json(err);
        }
    });
})

Router.get('/check',Apiauth,(req,res)=>{
    res.json("success");
})

module.exports=Router;