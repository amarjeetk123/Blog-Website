
require("dotenv").config();
const express = require("express")
const app = express()




// Databse Connection
const connectToDB = require("./config/databse")
connectToDB();



// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require("./routes/Auth")
app.use("/" , userRoutes)






module.exports = app