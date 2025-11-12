const express=require('express')
const router=express.Router()
const authMiddleware=require('../middleware/fooditems.middleware')
const multer=require('multer')
const itemsFood=require("../controllers/fooditems.controller")

const upload=multer({
    storage:multer.memoryStorage(),
})

router.post("/",authMiddleware.authFoodPartnerMiddlware,upload.single("video"),itemsFood.createFood)

router.get("/partnerprof",authMiddleware.authFoodPartnerMiddlware,itemsFood.getPartnerProfile)

router.get("/",authMiddleware.authUserMiddleware,itemsFood.getFoodItems)


router.post("/like",authMiddleware.authUserMiddleware, itemsFood.likeFoodItem);

router.post("/save",authMiddleware.authUserMiddleware, itemsFood.saveFoodItem);

router.get("/saveditems",authMiddleware.authUserMiddleware, itemsFood.getSavedItems);



module.exports=router