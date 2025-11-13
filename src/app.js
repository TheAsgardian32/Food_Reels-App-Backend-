//create a server
const express = require('express')
const cookieParser = require('cookie-parser')
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    // origin: "https://food-reels-app-frontend.vercel.app",
    origin: "http://localhost:5173",
    credentials: true
}))
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const authRoutes = require("./routes/auth.routes")
const foodRoutes = require("./routes/fooditems.routes")
const profileRoutes = require("./routes/profile.routes")



app.get("/", (req, res) => {
    res.send("HelloWorld")
})

app.use("/api/auth", authRoutes) //Prefix and what happens in the route of prefix
app.use("/api/food", foodRoutes)
app.use("/api/profile", profileRoutes)


module.exports = app;
