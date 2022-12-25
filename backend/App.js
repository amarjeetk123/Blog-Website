
require("dotenv").config();
const express = require("express")
const app = express()
const cors = require("cors")

const path = require("path")

// Databse Connection
const connectToDB = require("./config/databse")
connectToDB();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

const userRoutes = require("./routes/Auth")
app.use("/" , userRoutes)

app.use("/images" , express.static(path.join(__dirname , "/images")) )


module.exports = app