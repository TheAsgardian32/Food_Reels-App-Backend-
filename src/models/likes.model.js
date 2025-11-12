const mongoose=require("mongoose")

const likesSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    foodItem:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"fooditemmodel",
        required:true,
    },
})
const likesModel=mongoose.model("likesmodel",likesSchema);
module.exports=likesModel;