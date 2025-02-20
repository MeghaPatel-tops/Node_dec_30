var express = require('express');
var Router = express.Router();
var UserController = require('../Controller/UserController');
const Auth = require('../Middleware/Auth');

Router.get('/index',(req,res)=>{
    res.json("user route");
})

Router.get('/reg',(req,res)=>{
    res.render('User/reg.hbs')
})

Router.post('/store',(req,res)=>{
    UserController.addUser(req,res,(data,err)=>{
        if(data){
            //res.status(200).json({"code":1,"msg":"inserted","user":data});
            res.redirect('/users/home')
        }
        else{
            res.status(500).json({"code":0,"error":err});
        }
    })
})

Router.get('/login',(req,res)=>{
    res.render('User/login.hbs');
})
Router.post('/verifyuser',(req,res)=>{
        UserController.verifyUsers(req,res);
})

Router.get('/home',Auth,(req,res)=>{
    UserController.userDetails(req,res,(data)=>{
        res.render('User/Home.hbs',{user:data});
    })
})

Router.get('/logout',(req,res)=>{
    UserController.logout(req,res);
})

module.exports= Router;