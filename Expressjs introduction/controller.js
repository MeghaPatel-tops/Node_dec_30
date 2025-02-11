const {MongoClient, ObjectId} = require('mongodb');

const dotenv = require('dotenv').config();

const url = process.env.MONGO_URL;

const Client = new MongoClient(url);

const db ="ecommerce";

const sbConnect = async()=>{
    const connect = await Client.db(db);
    if(connect){
        console.log("db create");
        const userCollection=await connect.createCollection('users');
        return userCollection
    }
}

const addUser = async(req,res,cb)=>{
    
    try {
        const  userCollection = await sbConnect();
        const userObj= req.body;
        const result = await userCollection.insertOne(userObj);
        if(result){
            cb(result)
        }
        console("incontroller function")
    
    } catch (error) {
        if(error){
            cb(undefined,error);            
        }
    }
}

const getUsers = async(req,res,cb)=>{
   try {
    const  userCollection = await sbConnect();
    const users = await userCollection.find();
    const userData = await users.toArray();
    cb(userData);
   } catch (error) {
        cb(undefined,error);
   }

}

const deleteUser = async(req,res,cb)=>{
    const id= req.params.id;
    console.log(id);
    const Id = new ObjectId(id);
    try {
        const  userCollection = await sbConnect();

        const response = await userCollection.deleteOne({_id:Id});
        console.log(response);
        cb(response)
    } catch (error) {
        console.log(error);
        cb(undefined,error)
    }
}

module.exports={addUser,getUsers,deleteUser}