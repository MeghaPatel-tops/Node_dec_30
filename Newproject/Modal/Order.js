const mongoose = require('mongoose');

const orderSchema = new  mongoose.Schema({
    userId:String,
    payment_id:String,
    order_id:String,
})

const Order =  mongoose.model("orders",orderSchema);

module.exports=Order