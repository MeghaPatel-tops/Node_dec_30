var mongoose= require('mongoose');
var dotenv= require('dotenv').config();

var url = process.env.mongoose_url;
mongoose.connect(url).then(()=>{
    console.log("db connected");
}).catch((error)=>{
    
        console.log(error);
    
})