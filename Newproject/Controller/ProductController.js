var Product = require('../Modal/Product')
var axios = require('axios')
var fs = require('fs');
var ProductModal= require('../Modal/ProductModal');
var Cart = require('../Modal/Cart')
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
        const products = await ProductModal.find();
        // console.log(products.data);
        // const result = await ProductModal.insertMany(products.data);
        // if(result){
        //     console.log(result);
        // }

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
        console.log(product)
        var price =0;
        if(product){
            price= product.price;
         }
        
        const result = await Cart.insertOne({"userId":userId,"productId":pid,"qty":1,"subtotal":price});
        if(result){
            cb(result);
        }
    } catch (error) {
        cb(undefined,error);
        console.log(error)
    }
}

module.exports={addProduct,viewProduct,editProduct,updateProduct,deleteProduct,getFakeProduct,addtocart}