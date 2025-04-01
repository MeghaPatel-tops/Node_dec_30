var mongoose = require('mongoose');


const tokenModelf= mongoose.Schema({
    userId:String,
    token:String,
    expireAt: { type: Date,  expires: 60000,default: Date.now  }
}


)

const Token = mongoose.model('tokenCollection',tokenModelf)

module.exports = Token