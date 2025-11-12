const mongoose=require("mongoose")

const fooditemSchema=new mongoose.Schema({
    name:{type:String,required:true},
    video:{type:String,required:true},
    description:{type:String,required:true},
    foodPartner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"foodpartners"
    },
    likesCount:{
        type:Number,
        default:0,
    },
    saveCount:{
        type:Number,
        default:0,
    },
})
const foodItemModel=mongoose.model("fooditemmodel",fooditemSchema)

module.exports=foodItemModel