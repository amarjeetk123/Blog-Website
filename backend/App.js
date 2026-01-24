require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Database
const connectToDB = require("./config/databse");
connectToDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "https://blog-website-git-master-amarjeetk123s-projects.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.options("*", cors());

// Routes
const userRoutes = require("./routes/Auth");
app.use("/", userRoutes);

// Static images
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
