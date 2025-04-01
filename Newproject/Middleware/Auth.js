const User = require('../Modal/Users');
const Auth = async(req,res,next)=>{
    try {
        const userid= req.session.userId;
       
        const user = await User.findById(userid)
        console.log(user);
        if(user){
            next();
        }
        else{
            res.render('User/login');
        }
        
    } catch (error) {
        
    }
}
module.exports = Auth;