const Category = require("../models/Category")

exports.createCategory = async (req , res) =>{
    
    const {name}  = req.body

    try {
       if(!name){
        return res.status(402).send("name is required")
       }
      const saveCat =  await Category.create({name})
        res.status(201).json({
            success: true,
            saveCat,
            message: "category added to databse succesfully"
        })  
    } catch (error) {
        console.log("error is:-", error.message)
        console.log("error in createCategory controller")
        res.status(401).json({
            success: false,
            message: "category is not created",
            aa: error.message,
        })
    }

}


exports.getAllCategory = async (req , res) =>{
    try {
      const category =  await Category.find();
        res.status(201).json({
            success: true,
            category,
            message: "category fectch from databse succesfully"
        })
        
    } catch (error) {
        console.log("error is:-", error.message)
        console.log("error in getAllCategory controller")
        res.status(401).json({
            success: false,
            message: "category in not found"
        })
    }
}

