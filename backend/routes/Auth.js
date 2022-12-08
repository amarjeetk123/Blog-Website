const express = require("express");
const router = express.Router();

const {home , register , login, update , deleteuser , getUser , createPost , updatePost ,deletePost, getPost } = require("../controller/userController")

router.get("/",home)
router.post("/register",register)

router.post("/login",login)
router.put("/:id",update)
router.delete("/:id", deleteuser)
router.get("/:id", getUser)

router.post("/post",createPost)
router.put("/post/:id",updatePost)
router.delete("/post/delete/:id",deletePost)
router.get("/getpost/:id",getPost)


module.exports = router;
