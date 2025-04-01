const UserModel = require('../Modal/Users');
const bcrypt = require('bcrypt');
const saltRound = 10;
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config();
const tokenModel = require('../Modal/Token');



const secret = process.env.apitokensecert;
const UserRegisration = async(req,res,cb)=>{
    try {
        const salt = await bcrypt.genSalt(saltRound);
        const hashPass = await bcrypt.hash(req.body.password,salt);
        const User1 = new UserModel({
            "username":req.body.username,
            "email":req.body.email,
            "password":hashPass,
            "contactno":req.body.contactno
        });
        const result = await User1.save();
       cb(result);
    } catch (error) {
        console.log(error)
        cb(undefined,error)
        
    }

}

const Login = async(req,res,cb)=>{
    try {
        
        const email = req.body.email;
        const UserData = await UserModel.findOne({email:email});
        if(UserData){
            console.log("test")
            const flag = await bcrypt.compare(req.body.password,UserData.password);
            if(flag){              
                const token = jwt.sign({userId:UserData._id},secret);
                const tokenData = new tokenModel({
                    "userId":UserData._id,
                    "token":token
                });
                const tokenSave = await tokenData.save();
                console.log(tokenSave);
                const data ={"msg":"Login successfully","status":1,"token":token};
               cb(data)
            }
            else{
                const data ={"msg":"Login fail Enter valid password","status":2};
                cb(data)
            }
        }
        else{
            const data ={"msg":"Login fail Enter valid email","status":2};
            cb(data)
        }
         
    } catch (error) {
        cb(undefined,error)
    }
}

module.exports={UserRegisration,Login}