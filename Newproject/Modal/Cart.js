const mongoose = require('mongoose');
const producCollection = require("../Modal/ProductModal")

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users", // Reference to the users collection
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: producCollection, // Reference to the products collection
        required: true,
    },
    qty: {
        type: Number,
        required: true,
        min: 1, // Ensures quantity is at least 1
    },
    subtotal: {
        type: Number, // Change from String to Number
        required: true,
    },
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
