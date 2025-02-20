const User = require('../Modal/Users');
const Auth = async(req,res,next)=>{
    try {
        const userid= req.session.userId;
        console.log(userid);
        const user = await User.findById(userid)
        if(user){
            next();
        }
        else{
            res.redirect('users/login');
        }
        
    } catch (error) {
        
    }
}
module.exports = Auth;