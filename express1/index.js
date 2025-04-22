const express = require("express");
const app = express();
const errorHandler = require("./middleware/errorhandler");
const mongoose = require("mongoose");
const connectDb = require('./config/dbConnection');
const dotenv = require('dotenv').config();
const cors = require("cors");
const bcrypt = require("bcrypt");
const User = require("./models/credentialsModel");
const { 
    loginUser, 
    registerUser,
    forgot,
    reset,
} = require("./controllers/userController");
connectDb();
app.use(express.json());
app.use(cors({
    origin: "*",
}));
// app.get("/", (req, res) => {
//     res.send("Backend running!");
//   });
app.get("/", (req, res) => {
    res.send("Backend running!");
  });
app.post("/register",registerUser);
//app.use(errorHandler);
app.post("/login",loginUser);
//app.use(errorHandler);
app.post("/forget",forgot);
//app.use(errorHandler);
app.post("/reset",reset);
app.use(errorHandler);
app.listen(5000,()=>{
    console.log("Server Started")
})