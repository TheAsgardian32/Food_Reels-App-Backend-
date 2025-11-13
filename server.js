//This is to start a server
const app=require("./src/app")
const mongoose=require("mongoose")
// const connectDb=require("./src/db/db")
const port=process.env.PORT || 3000
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

app.listen(port,()=>{
    console.log("App listening on port ")
})


