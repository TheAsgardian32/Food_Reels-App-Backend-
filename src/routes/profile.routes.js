const express=require("express");
const router=express.Router();
const profileController=require("../controllers/profile.controller")
const authMiddleware=require("../middleware/fooditems.middleware")

console.log("Profile routes loaded")
router.get("/:id",authMiddleware.authUserMiddleware,profileController)

module.exports=router;