//This is to start a server
const app=require("./src/app")
const connectDb=require("./src/db/db")


connectDb();


app.listen(3000,()=>{
    console.log("App listening on port 3000")
})


