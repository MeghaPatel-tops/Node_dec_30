const bcrypt = require('bcrypt');
const User = require('../Modal/Users');

const saltRound = 10;

const addUser = async(req,res,cb)=>{
    try {
        const salt = await bcrypt.genSalt(saltRound);
        const hashPass = await bcrypt.hash(req.body.password,salt);
        const User1 = new User({
            "username":req.body.username,
            "email":req.body.email,
            "password":hashPass,
            "contactno":req.body.contactno
        });
        const result = await User1.save();
        if(result){
            cb(result);
        }
    } catch (error) {
            cb(undefined,error)
    }
    
}

const verifyUsers= async(req,res)=>{
    try {
        console.log(req.body);
        const userData = await User.findOne({email:req.body.email});
        if(userData){
            const flag = await bcrypt.compare(req.body.password,userData.password);
            if(flag){
                res.redirect('/users/home');
            }
            else{
                res.send({"msg":"Incorrect password"})
            }
        }
        else{
            res.send({"msg":"Incorrect Email Id"})
        }
    } catch (error) {
                res.status(500).json(error);
    }
}

module.exports = {addUser,verifyUsers}