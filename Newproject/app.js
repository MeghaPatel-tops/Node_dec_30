var express= require('express');
var cors= require('cors');

var app = express();
const bodyparser = require('body-parser')
var dotenv= require('dotenv').config();
var db = require('./Modal/db');
var port = process.env.PORT;
var productController = require('./Controller/ProductController')
var multer = require('multer')
var path = require('path');

var hbs = require('hbs');

// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

app.set('view engine','hbs');
hbs.registerPartials(__dirname+'views');

app.use("/upload",express.static(path.join(__dirname,'upload')));


app.get('/addproduct',async(req,res)=>{
    res.render('index.hbs');
})
//create storage for file upload 
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'upload/')
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const uploadFile = multer({storage});

app.post('/productadd',uploadFile.single('pimg'),(req,res)=>{
    productController.addProduct(req,res,(data,err)=>{
        if(data){
            res.redirect('/viewproduct');
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

app.get('/editproduct/:id',(req,res)=>{
     productController.editProduct(req,res,(data,err)=>{
        if(data){
            res.render('editproduct.hbs',{product:data});
        }
     })
})

app.post('/productupdate/:id',uploadFile.single('pimg'),(req,res)=>{
   productController.updateProduct(req,res,(data,err)=>{
    if(data){
        res.redirect('/viewproduct');
    }
    else{
        res.status(500).json({"error":err});
    }
   })
})

app.post('/deleteproduct/:id',(req,res)=>{
    productController.deleteProduct(req,res,(data,err)=>{
        if(data){
            res.redirect('/viewproduct');
        }else{
            res.status(500).json(err);
        }
    })
})

app.listen(port,()=>{
    console.log(`app listing on ${port}`);
})