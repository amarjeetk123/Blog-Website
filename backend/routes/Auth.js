const express = require("express");
const router = express.Router();

const {home , register , login, update , deleteuser , getUser , createPost , updatePost ,deletePost, getPost, getAllPost } = require("../controller/userController")

router.get("/",home)
router.post("/register",register)
router.post("/login",login)

router.put("user/:id",update)
router.delete("user/:id", deleteuser)
router.get("user/:id", getUser)

router.post("/post",createPost)
router.put("/post/:id",updatePost)
router.delete("/post/delete/:id",deletePost)
router.get("/getpost/:id",getPost)
router.get("/getallpost",getAllPost)


module.exports = router;
