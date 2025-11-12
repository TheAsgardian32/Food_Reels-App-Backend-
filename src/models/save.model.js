const mongoose=require("mongoose")

const saveSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    foodItem:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"fooditemmodel",
        required:true,
    }
})

const saveModel=mongoose.model("savemodel",saveSchema);
module.exports=saveModel;
    
