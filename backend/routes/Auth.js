const express = require("express");
const router = express.Router();


const {home , register , login, update , deleteuser , getUser , createPost , updatePost ,deletePost, getPost, getAllPost, getUserByUserName } = require("../controller/userController")

const {createCategory , getAllCategory } = require("../controller/categoryController");


router.get("/",home)
router.post("/register",register)
router.post("/login",login)

router.put("/user/update/:id",update)
router.delete("/user/delete/:id", deleteuser)
router.get("/user/:id", getUser)
router.post("/getuserbyusername", getUserByUserName)


router.post("/post",createPost)
router.put("/post/:id",updatePost)
router.delete("/post/delete/:id",deletePost)
router.get("/getpost/:id",getPost)
router.get("/getallpost",getAllPost)


router.post("/category",createCategory)
router.get("/getallcategory",getAllCategory)




const multer = require("multer") // for string photos from user

const storage = multer.diskStorage({
    destination:(req,file,cb) => {   //  cb- call back
        cb(null , "images")   // images is our destination folder where our images will be stored
    },
    filename:(req,file,cb) =>{
      //  cb(null,"hello.jpg") for postman  // this file name will provided from frontend
      cb(null,req.body.name)
    }
})

const upload = multer({storage:storage});
router.post("/api/upload" , upload.single("file") , (req , res) => {    // "file" is the key name
    try {
      
        res.status(201).json({
            succsess : true,
            message: "file has benn uploaded",
        })
    } catch (error) {
        console.log(error.message)
        res.status(201).json({
            succsess : false,
            message: "file has not benn uploaded",
        })
    }
} )


module.exports = router;