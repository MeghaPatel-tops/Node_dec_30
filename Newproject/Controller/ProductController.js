var Product = require('../Modal/Product')
var fs = require('fs');
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

module.exports={addProduct,viewProduct,editProduct,updateProduct,deleteProduct}