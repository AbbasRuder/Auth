import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"

// -@desc -> Authenticate a user
// -route -> POST api/users/auth
// -@access -> public
const authUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Authenticate User" })
})

// -@desc -> Register a new user
// -route -> POST api/users
// -@access -> public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    
    // -check if user already exist
    const existingUser = await User.findOne({ email })
    if (existingUser) {
        res.status(400)
        throw new Error("User already exists")
    }

    const newUser = await User.create({ name, email, password })
    if (newUser) {
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email
        })
    } else {
        res.status(400)
        throw new Error("Error in registering user")
    }
})

// -@desc -> Logging out a  user / clearing the cookies
// -route -> POST api/users/logout
// -@access -> public
const logoutUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "User logged out" })
})

// -@desc -> Getting the user profile data
// -route -> GET api/users/profile
// -@access -> private
const getUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Getting the user profile data" })
})

// -@desc -> Updating the user profile data
// -route -> PUT api/users/profile
// -@access -> private
const updateUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Updating the user profile data" })
})


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}