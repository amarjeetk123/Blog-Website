require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");

const app = express();

/* ================= DATABASE ================= */
const connectToDB = require("./config/databse");
connectToDB();

/* ================= MIDDLEWARE ================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= CORS CONFIG ================= */
const allowedOrigins = [
  "http://localhost:3000",
  "https://blog-website-git-master-amarjeetk123s-projects.vercel.app",
  "https://writeme-blog.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow Postman / server-to-server
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Preflight
app.options("*", cors());

/* ================= ROUTES ================= */
const userRoutes = require("./routes/Auth");
app.use("/", userRoutes);

/* ================= STATIC FILES (optional) ================= */
app.use("/images", express.static(path.join(__dirname, "images")));

/* ================= MULTER ERROR HANDLER (CRITICAL) ================= */
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  if (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }

  next();
});

/* ================= EXPORT ================= */
module.exports = app;
