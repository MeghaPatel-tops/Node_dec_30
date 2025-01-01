const express = require('express')

const Router = express.Router();


const routeMiddleware =(req,res,next)=>{
    req.time = new Date(Date.now()).toString();
    console.log("====================request log router level===========");
    console.log(req.hostname,req.path,req.time);
    next();
}




Router.use(routeMiddleware);

Router.get('/',(req,res)=>{
    res.end("User route created");
})

module.exports = Router;