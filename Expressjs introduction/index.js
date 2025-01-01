var express= require('express');
var dotenv = require('dotenv').config();
const userRouter = require('./Route/Userroute')
const hbs = require('hbs')
const path = require('path')

const app = express();

const logMiddleware = (req,res,next)=>{
    req.time = new Date(Date.now()).toString();
    console.log("====================request log app level===========");
    console.log(req.hostname,req.path,req.time);
    next();
}

const errorMiddleware = (err,req,res,next)=>{
    res.status(500).send("Smoting Wrong")
}

app.set('views', path.join(__dirname,"views"))
console.log(path.join(__dirname,'views'))
app.set('view engine','hbs')

//app.use(errorMiddleware);
//app.use(logMiddleware);
//app.use('/users',userRouter)


app.get('/index',(req,res)=>{
    res.render('index');
})

app.get('/home',(req,res)=>{
    res.render('home',{name:"Megha Patel"})
})

app.get('/products',(req,res)=>{
    const products=[
        {productname:"laptop",price:212000},
        {productname:"keybord",price:212000},
        {productname:"laptop1",price:212000}
    ];
    res.render('product',{productsdata:products})
})

app.listen(process.env.PORT,()=>{
    console.log("project working on 3000");
})