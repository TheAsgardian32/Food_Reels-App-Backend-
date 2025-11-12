const FoodPartnerModel=require("../models/foodpartner.model")
const FoodItemModel=require("../models/fooditems.model")
console.log("Profile controller loaded")
async function profileController(req,res){
    console.log("Profile controller called")
    console.log("The id is",req.params.id)
    const FoodpartnerId=req.params.id;

    const foodPartner=await FoodPartnerModel.findById(FoodpartnerId)
    const foodItemsOfPartner=await FoodItemModel.find({foodPartner:FoodpartnerId})
    console.log(foodPartner)
    if(!foodPartner){
        return res.status(404).json({message:"Food partner not found"})
    }
    res.status(200).json({message:"Food partner retrieved succesfuly",
        foodPartner,foodItemsOfPartner})
    
} 
module.exports=profileController;
