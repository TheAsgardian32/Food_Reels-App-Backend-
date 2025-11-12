//create a server
const express=require('express')
const cookieParser=require('cookie-parser')
const mongoose=require("mongoose")
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const cors=require("cors")

function connectDb(){
    mongoose.connect("mongodb+srv://fazilfarhan24_db_user:0MR3MaFs4LTX6Hv7@cluster0.roiwdyo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=>{console.log("Mongo connected")})
    .catch((error)=>{
        console.log("Error found"+error)
    })
}


// connectDb();

const authRoutes=require("./routes/auth.routes")
const foodRoutes=require("./routes/fooditems.routes")
const profileRoutes=require("./routes/profile.routes")

const app=express()
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"https://food-reels-app-frontend.vercel.app",
    credentials:true
}))

app.get("/",(req,res)=>{
    res.send("HelloWorld")
})

app.use("/api/auth",authRoutes) //Prefix and what happens in the route of prefix
app.use("/api/food",foodRoutes)
app.use("/api/profile",profileRoutes)

module.exports=app;
