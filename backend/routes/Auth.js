const express = require("express");
const router = express.Router();

/* ================= CONTROLLERS ================= */
const {
    home,
    register,
    login,
    update,
    deleteuser,
    getUser,
    createPost,
    updatePost,
    deletePost,
    getPost,
    getAllPost,
    getUserByUserName
} = require("../controller/userController");

const {
    createCategory,
    getAllCategory
} = require("../controller/categoryController");

/* ================= ROUTES ================= */
router.get("/", home);
router.post("/register", register);
router.post("/login", login);

router.put("/user/update/:id", update);
router.delete("/user/delete/:id", deleteuser);
router.get("/user/:id", getUser);
router.post("/getuserbyusername", getUserByUserName);

router.post("/post", createPost);
router.put("/post/:id", updatePost);
router.delete("/post/delete/:id", deletePost);
router.get("/getpost/:id", getPost);
router.get("/getallpost", getAllPost);

router.post("/category", createCategory);
router.get("/getallcategory", getAllCategory);

/* ================= CLOUDINARY UPLOAD ================= */
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

/* Multer + Cloudinary Storage */
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "blog_images",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        public_id: (req, file) => {
            return Date.now() + "-" + file.originalname;
        },
    },
});

const upload = multer({ storage });

/* Upload API */
router.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        res.status(201).json({
            success: true,
            message: "File uploaded successfully",
            imageUrl: req.file.path,       // 🔥 Cloudinary public URL
            publicId: req.file.filename,   // useful for delete
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "File upload failed",
        });
    }
});

module.exports = router;
