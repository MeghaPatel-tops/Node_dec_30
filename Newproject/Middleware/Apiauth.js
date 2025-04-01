const tokenModel = require('../Modal/Token');
const Apiauth = async(req,res,next)=>{
    try {
        const tokenHeader =req.headers.authorization;
        const token1 = tokenHeader.split(" ")[1];
        const tokenResult = await tokenModel.findOne({token:token1})
        if(tokenResult){
            next();
        }
        else{
            res.status(200).json({"msg":"Unathorised user"});
        }
      
        
    } catch (error) {
        
    }
}
module.exports = Apiauth;