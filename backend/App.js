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

/* ================= CORS ================= */
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (origin === "http://localhost:3000") {
        return callback(null, true);
      }

      if (origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.options("*", cors({ origin: true, credentials: true }));

/* ================= ROUTES ================= */
const userRoutes = require("./routes/Auth");
app.use("/", userRoutes);

/* ================= ERROR HANDLER ================= */
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ success: false, message: err.message });
  }

  if (err) {
    return res.status(500).json({ success: false, message: err.message });
  }

  next();
});

module.exports = app;
