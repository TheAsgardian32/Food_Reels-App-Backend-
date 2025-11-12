const userModel = require('../models/user.model')
const foodPartnerModel = require("../models/foodpartner.model")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

async function registerUser(req, res) {

    const { fullName, email, password } = req.body

    const ifUserAlreadyExists = await userModel.findOne({ email })

    if (ifUserAlreadyExists) {
        return res.status(400).json({ message: "user already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        fullName: fullName,
        email: email,
        password: hashedPassword
    })

    const token = jwt.sign({
        id: user._id
    },
        process.env.JWT_SECRET
    )
    res.cookie("token", token)

    res.status(201).json({
        message: "User created succesfully and a JWT Token is also created on the basis of user id",
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
        }
    })
}
async function loginUser(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email })

    if (!user) {
        res.status(400).json({ message: "User not found" })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        res.status(400).json({ message: "Invalid username or password" })
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        message: "User logged in Succesfuly",
        user: {
            id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })

}

function logoutUser(req, res) {
    res.clearCookie("token")
    res.status(200).json({ message: "User Logged out succesfuly" })
}

async function registerFoodPartner(req, res) {
    const { name, email, password, contactName, phone, address } = req.body;

    const partnerAlreadyExists = await foodPartnerModel.findOne({ email })

    if (partnerAlreadyExists) {
        return res.status(400).json({ message: "Partner already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const foodPartners = await foodPartnerModel.create({
        name,
        email,
        password: hashedPassword,
        contactName,
        phone,
        address
    })

    const token = jwt.sign({
        id: foodPartners._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        message: "Partner Created Succesfully",
        partner: {
            name,
            email,
            id: foodPartners._id,
            contactName,
            phone,
            address
        }
    })

}

async function loginFoodPartner(req, res) {
    const { email, password } = req.body;

    const foodPartnerAlreadyExists = await foodPartnerModel.findOne({ email })

    if (!foodPartnerAlreadyExists) {
        res.status(400).json({ message: "Partner doesnt exist" })
    }

    const comparepass = await bcrypt.compare(password, foodPartnerAlreadyExists.password)

    if (!comparepass) {
        return res.status(400).json({ message: "Invalid username or password" })
    }

    const token = jwt.sign({
        id: foodPartnerAlreadyExists._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({ message: "Partner logged in Succesfuly",fpid:foodPartnerAlreadyExists })

}

function logoutFoodPartner(req, res) {
    res.clearCookie("token")
    res.status(200).json({ message: "Partner logged out succesfuly" })
}


module.exports = { registerUser, loginUser, logoutUser, registerFoodPartner, loginFoodPartner, logoutFoodPartner };