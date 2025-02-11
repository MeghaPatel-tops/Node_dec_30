var Product = require('../Modal/Product')
const addProduct = async(req,res,cb)=>{
        try {
           const product = new Product({
            productname:req.body.productname,
            price:req.body.price,
            description:req.body.description,
            qty:req.body.qty
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

module.exports={addProduct,viewProduct}