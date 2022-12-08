const express = require("express");
const router = express.Router();

const {home , register , login, update , deleteuser , getUser , createPost , updatePost } = require("../controller/userController")

router.get("/",home)
router.post("/register",register)
router.post("/login",login)
router.put("/:id",update)
router.delete("/:id", deleteuser)
router.get("/:id", getUser)

router.post("/post",createPost)
router.put("/post/:id",updatePost)


module.exports = router;
