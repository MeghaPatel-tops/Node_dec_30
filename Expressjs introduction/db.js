const {MongoClient, ObjectId} = require('mongodb');

const dotenv = require('dotenv').config();

const url = process.env.MONGO_URL;

const Client = new MongoClient(url);

const db ="ecommerce";

const sbConnect = async()=>{
    const connect = await Client.db(db);
    if(connect){
        console.log("db create");
        const postCollection=await connect.createCollection('post');
        return postCollection
    }
}

const insertData = async()=>{
    const collection = await sbConnect();
    //console.log(collection);
     const insertResult = await collection.insertOne({"postname":"test post","description":"description"})
    console.log(insertResult);
}

const getSingleData= async()=>{
    const  collection = await sbConnect(); 
   const data= await collection.findOne({"postname":"test post"}) 
    console.log(data);

}

const deleteData=async()=>{
    const  collection = await sbConnect();
    const result = await collection.deleteOne({"postname":"test post"}) ;
    console.log(result)
}

const getData = async()=>{
    const  collection = await sbConnect();
    const data= await collection.find().toArray();
    console.log(data);
}

const updateData= async()=>{
    const  collection = await sbConnect();
    const res= await collection.updateOne({"postname":"test post"},{$set:{"description":"test data addedddadada"}});
    console.log(res)
}


module.exports={sbConnect,insertData,getSingleData,deleteData,getData,updateData}