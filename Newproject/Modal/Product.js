var mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productname:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    qty:{
        type:Number,
        required:true
    }

})

const  Product = new mongoose.model("products",productSchema);

module.exports=Product;