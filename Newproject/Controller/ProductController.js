var Product = require('../Modal/Product')
var axios = require('axios')
var fs = require('fs');
var ProductModal= require('../Modal/ProductModal');
var Cart = require('../Modal/Cart')
const User = require('../Modal/Users');
const Model = require('../Modal/Order');
const Order = require('../Modal/Order')

const paymentAdd= async(req,res,cb)=>{
   try {
    console.log(req.body)
    const paymentDetails = new Order({
        userId:req.session.userId,
        payment_id:req.body.razorpay_payment_id,        
        order_id:req.body.razorpay_order_id,
    });
    const result = await paymentDetails.save();
    if(result){
        cb(result)
    }
   } catch (error) {
    cb(undefined,error)
    console.log(error)
   }
}

const addProduct = async(req,res,cb)=>{
        try {
           const product = new Product({
            productname:req.body.productname,
            price:req.body.price,
            description:req.body.description,
            qty:req.body.qty,
            productimg:req.file.filename
           }) 
           const result = await product.save();
           if(result){
               cb(result)
           }
        } catch (error) {
            cb(undefined,error);
        }
}
const viewProduct = async (req,res,cb) => {
    try {
        const product = await Product.find();
        if(product){
            cb(product);
        }
    } catch (error) {
        cb(undefined,error)
    }
}

const editProduct = async(req,res,cb)=>{
    try {
        const id=req.params.id;
        const product = await Product.findById(id);
        cb(product);
    } catch (error) {
       cb(undefined,error)
    }
}

const updateProduct = async(req,res,cb)=>{
    try {
        const id= req.params.id;
        const product = await Product.findById(id);
        console.log(product.productimg);
        fs.unlink(`upload/${product.productimg}`,(err)=>{
            if(err){
                console.log(err);
            }
            console.log("Image remoce from dir");
        })
        const updateProduct ={
            productname:req.body.productname,
            price:req.body.price,
            description:req.body.description,
            qty:req.body.qty, 
            productimg:req.file.filename
        }
        const result = await Product.updateOne({_id:id},updateProduct,{});
        console.log(result);
        cb(result);
        

    } catch (error) {
        console.log(error);
        cb(undefined,error);
        
    }
}

const deleteProduct= async(req,res,cb)=>{
    try {
        const id=req.params.id;
        const product = await Product.findById(id);
        console.log(product.productimg);
        fs.unlink(`upload/${product.productimg}`,(err)=>{
            if(err){
                console.log(err);
            }
            console.log("Image remoce from dir");
        })
        const result = await Product.deleteOne({_id:id});
        cb(result)
        
    } catch (error) {
        cb(undefined,error);
    }
}

const getFakeProduct = async(req,res,cb)=>{
    try {
        // const products= await axios.get("https://fakestoreapi.com/products");
        // console.log(products.data);
       
        // console.log(products.data);
        // const result = await ProductModal.insertMany(products.data);
        // if(result){
        //     console.log(result);
        //     cb(products)
        // }
        const products = await ProductModal.find();
        if(products){
            cb(products)
        }
        
    } catch (error) {
        cb(undefined,error);
    }
}

const addtocart = async(req,res,cb)=>{
   
    try {
        const pid= req.params.pid;
        const userId= req.session.userId;
        const product = await ProductModal.findById(pid);
        const cartProduct = await Cart.findOne({productId:pid,userId:req.session.userId});
        console.log(cartProduct);
        var result;
        if(cartProduct){
            result = await Cart.updateOne({_id:cartProduct._id},{$inc:{qty:1}});
        }
        else{
            console.log(product)
            var price =0;
            if(product){
                price= product.price;
             }
            
            result = await Cart.insertOne({"userId":userId,"productId":pid,"qty":1,"subtotal":price});
        }
      
        if(result){
            cb(result);
        }
    } catch (error) {
        cb(undefined,error);
        console.log(error)
    }
}

const ViewCart = async(req,res,cb)=>{
    try {
        console.log( req.session.userId);
        var total=0;
        const cartdata = await Cart.find({userId:req.session.userId}).populate('productId');
        //console.log(cartdata);

        for(index of cartdata){
            total += (index.productId.price*index.qty);
            console.log(index)
        }
        var result = {"cartdata":cartdata,"total":total}
        if(cartdata){
            cb(result)
        }
    } catch (error) {
        cb(undefined,error)
    }
}

const updateCart = async(req,res,cb)=>{
    try {
        const data = await Cart.updateOne({_id:req.body.cartid},{$set:{"qty":req.body.num}});
        console.log( req.session.userId);
        const cartdata = await Cart.find({userId:req.session.userId}).populate('productId');
        if(cartdata){
            cb(cartdata)
        }
    } catch (error) {
        
    }
}



module.exports={addProduct,viewProduct,editProduct,updateProduct,deleteProduct,getFakeProduct,addtocart,ViewCart,updateCart,paymentAdd}