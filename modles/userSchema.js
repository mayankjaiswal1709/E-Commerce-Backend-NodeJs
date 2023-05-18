
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    user_Id: {
        type: Number
    },
    userName: {
        type: String,
        require: true,
    },
    userEmail: {
        type: String,
        require: true,
    },
    userPassword:{
        type:String,
        require:true,
    },
    userPhoneno:{
        type:Number,
        require:true,
    },
    userAddress:{
        type:String,
        require:true,

    },
    userCity:{
        type:String,
        require:true,
    },
    userState:{
        type:String,
        require:true,
    },
    userCountry:{
        type:String,
        require:true, 
    },
    userProfilePic:{
        type:String,
    },
    userRole:{
        type:String,
        default:"user",
    },
    isActive:{
        type:Boolean,
        default:true
    }

})
userSchema.set('timestamps',true)
module.exports = mongoose.model('user',userSchema)