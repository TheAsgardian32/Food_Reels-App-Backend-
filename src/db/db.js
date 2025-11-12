const mongoose=require("mongoose")

function connectDb(){
    mongoose.connect("mongodb+srv://fazilfarhan24_db_user:0MR3MaFs4LTX6Hv7@cluster0.roiwdyo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=>{console.log("Mongo connected")})
    .catch((error)=>{
        console.log("Error found"+error)
    })
}

module.exports=connectDb;
