require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();

/* ========== DATABASE ========== */
const connectToDB = require("./config/databse");
connectToDB();

/* ========== MIDDLEWARE ========== */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ========== CORS (SIMPLE & SAFE) ========== */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://blog-website-git-master-amarjeetk123s-projects.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

/* ========== ROUTES ========== */
const userRoutes = require("./routes/Auth");
app.use("/", userRoutes);

/* ========== ERROR HANDLER ========== */
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }

  if (err) {
    return res.status(500).json({ message: err.message });
  }

  next();
});

module.exports = app;
