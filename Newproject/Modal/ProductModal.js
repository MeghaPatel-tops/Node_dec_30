const mongoose = require('mongoose');

const ProductModalSchema = new mongoose.Schema({
    'title':{
        type:String,
        required:true,
    },
    'price':{
        type:Number,
        required:true,
    },
    'description':{
        type:String,
        required:true
    },
    'category':{
        type:String,
        required:true
    },
    'image':{
        type:String,
        required:true
    }
})

const ProductModal = mongoose.model("productcollection",ProductModalSchema);

module.exports=ProductModal;