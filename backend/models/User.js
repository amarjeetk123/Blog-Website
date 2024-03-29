const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        unique:true,
        required : [true , "Fullname is required"]
    },
    username:{
        type:String,
        unique:true,
        required : [true , "userName is required"]
    },
 
    email:{
        type:String,
   
        required : [true , "email is required"]
    },
    password:{
        type:String,
        required : [true , "password is required"]
    },
    profilepicture:{
        type: String,
        default: "",
    }

},
{timestamps:true}


)

module.exports = mongoose.model("User" , userSchema )