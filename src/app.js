//create a server
const express = require('express')
const cookieParser = require('cookie-parser')
const mongoose = require("mongoose")
const cors = require("cors")
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000, // optional: prevents long waits
    });
        console.log("✅ MongoDB connected successfully");
    }
    catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // ⚠️ ensures app stops if DB connection fails
  }
    
}
connectDb();

const authRoutes = require("./routes/auth.routes")
const foodRoutes = require("./routes/fooditems.routes")
const profileRoutes = require("./routes/profile.routes")

const app = express()
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "https://food-reels-app-frontend.vercel.app",
    credentials: true
}))

app.get("/", (req, res) => {
    res.send("HelloWorld")
})

app.use("/api/auth", authRoutes) //Prefix and what happens in the route of prefix
app.use("/api/food", foodRoutes)
app.use("/api/profile", profileRoutes)

module.exports = app;
