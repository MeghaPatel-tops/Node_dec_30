var express= require('express');
var cors= require('cors');

var app = express();
const bodyparser = require('body-parser')
var dotenv= require('dotenv').config();
var db = require('./Modal/db');
var port = process.env.PORT;
var productController = require('./Controller/ProductController')

var hbs = require('hbs');

// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

app.set('view engine','hbs');
hbs.registerPartials(__dirname+'views');

app.get('/addproduct',async(req,res)=>{
    res.render('index.hbs');
})

app.post('/productadd',(req,res)=>{
    productController.addProduct(req,res,(data,err)=>{
        if(data){
            res.status(200).json({"msg":"data sucessfully inserted!",'product':data})
        }
        else{
            res.status(500).json(err);
        }
    })
})
app.get('/viewproduct',(req,res)=>{
    productController.viewProduct(req,res,(data,err)=>{
        if(data){
            res.render('viewproduct.hbs',{product:data});
        }
    });
})

app.listen(port,()=>{
    console.log(`app listing on ${port}`);
})