var express= require('express');
var dotenv = require('dotenv').config();
const userRouter = require('./Route/Userroute')
const hbs = require('hbs')
const path = require('path')
var axios = require('axios')
const getWhetherApp = require('./src/getwhether')
const Db = require('./db');

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

app.use('/public',express.static(path.join(__dirname,'public')))
app.set('views', path.join(__dirname,"views"))
console.log(path.join(__dirname,'views'))
app.set('view engine','hbs')
hbs.registerPartials(path.join(__dirname,'./views/partials'))

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

app.get('/getWhetherApp/:city',(req,res)=>{
    city = req.params.city;
    getWhetherApp.getDataByCity(city,(data,err)=>{
        if(data){
           getWhetherApp.getwhetherCall(data.lat,data.lon,(data1,err)=>{
                if(data1){
                    res.send(data1);
                }
                else{
                    res.status(500).send({"msg":"Something wrong"})
                }
           })
        }
        else{
            res.status(500).send({"msg":"Something wrong"})
        }
    })
    
})

app.get('/aboutpage',(req,res)=>{
    res.render('About');
})

app.get('/citydata/:city',(req,res)=>{
    const city =req.params.city;
    getWhetherApp.getDataByCity(city,(data,err)=>{
        if(data){
            getWhetherApp.getwhetherCall(data.lat,data.lat,(data1,err)=>{
                if(data1){
                    res.status(200).send(data1);
                }
                else{
                    res.status(500).send({"msg":"Something wrong"})
                }
            })
        }
        else{
            res.status(500).send({"msg":"Something wrong"})
        }
    })
})

app.get('/connectdb',(req,res)=>{
    Db.updateData()
})



app.listen(process.env.PORT,()=>{
    console.log("project working on 3000");
})