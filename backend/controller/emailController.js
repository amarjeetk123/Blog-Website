const User = require("../models/User");
// const bcrypt = require("bcryptjs")

// controller for forgot password
exports.forgotPassword = async (req,res) => {
    //collected information from frontend
    let { email } = req.body
    if(!email){
        return res.status(401).json("Please Write Your Emailid.....");
    }
    let userExist = User.findOne({email})
    if(!userExist){
        return res.status(401).json("Wrong Emailid...");
    }
}