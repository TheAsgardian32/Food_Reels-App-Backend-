const foodpartnerModel = require("../models/foodpartner.model")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")


async function authFoodPartnerMiddlware(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(400).json({ message: "Please Login First" })
    }
    console.log("token verified")

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)
        const foodPartner = await foodpartnerModel.findById(decoded.id)
        console.log(foodPartner)
        req.foodPartner = foodPartner
        next()

    }
    catch (error) {
        return res.status(400).json({ message: "Cannot recognize partner" })
    }


}

async function authUserMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(400).json({ message: "token doesnt exist" })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const whichUser = await userModel.findById(decoded.id)

        req.whichUser = whichUser;
        next()
    }
    catch (err) {
       return  res.status(400).json({ message: "Token authentication failed" })
    }

}

module.exports = { authFoodPartnerMiddlware, authUserMiddleware };