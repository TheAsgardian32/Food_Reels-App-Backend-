const foodItemModel = require("../models/fooditems.model")
const uploadFile = require("../services/storage.service")
const likesModel = require("../models/likes.model")
const saveModel = require("../models/save.model")

const { v4: uuid } = require('uuid')

async function createFood(req, res) {
    const fileUploadResult = await uploadFile(req.file.buffer, uuid())

    const foodItems = await foodItemModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id,
    })

    res.status(201).json({
        message: "food Item created Succesfuly",
        foodItem: foodItems
    })
}

async function getPartnerProfile(req,res)
{
    const fp=req.foodPartner._id;
    if(fp)
        return res.status(201).json({message:"Id sent",fp});
    return res.status(400).jso({message:"Partner session expired"});
}
async function getFoodItems(req, res) {
    const foodItems = await foodItemModel.find({})
    const whichUser = req.whichUser;

    res.status(200).json({
        message: "Items fetched Succesfuly",
        foodItems, whichUser
    })
}

async function likeFoodItem(req, res) {
    const { foodId } = req.body;
    const isAlreadyLiked = await likesModel.findOne({
        user: req.whichUser._id,
        foodItem: foodId,
    })

    console.log(isAlreadyLiked);

    if (isAlreadyLiked) 
    {
        console.log("Already Exists");
        await likesModel.deleteOne({
            user: req.whichUser._id,
            foodItem: foodId,
        })
        await foodItemModel.findByIdAndUpdate(foodId,
            {
                $inc: { likesCount: -1 }
            })
         const foodmodel=await foodItemModel.findById(foodId);
        return res.status(200).json({ message: "like reversed" })
    } 

    console.log("doesnt exist, so creating one");
    const like= await likesModel.create({
        user: req.whichUser._id,
        foodItem: foodId,
    })
    console.log("added to like compialtion");

    await foodItemModel.findByIdAndUpdate(foodId, {
        $inc: { likesCount: 1 }
    })
    const foodmodel=await foodItemModel.findById(foodId);
    res.status(201).json({ message: "like added", like});

}

async function saveFoodItem(req,res)
{
    console.log("Save function in backend triggered");
    const {foodId}=req.body;
    const userId=req.whichUser._id;
    const isAlreadySaved=await saveModel.findOne({
        user:userId,
        foodItem:foodId,
    })
    console.log("Cheked exists or not");
    if(isAlreadySaved)
    {
    console.log("This exists ")
        await saveModel.deleteOne({
            user:userId,
            foodItem:foodId
        })
        await foodItemModel.findByIdAndUpdate(foodId,{
            $inc:{saveCount:-1}
        })
        return res.status(200).json({message:"save removed succesfully"});
    }
    console.log("Doesnt exists ")
    const save=await saveModel.create({
        user:userId,
        foodItem:foodId,
    })
    await foodItemModel.findByIdAndUpdate(foodId,{
            $inc:{saveCount:1}
        })
    res.status(201).json({message:"saved succesfuly",save});

}

async function getSavedItems(req,res)
{
    console.log("Function triggered");
    const userId=req.whichUser._id
    console.log("The user who saved is ",userId);
    const savedByUser=await saveModel.find({user:userId}).populate('foodItem')
    console.log(savedByUser);
    return res.status(201).json({message:"Saved by user fetched succesfuly",savedByUser})
}
module.exports = { createFood, getFoodItems, likeFoodItem,saveFoodItem,getSavedItems,getPartnerProfile }