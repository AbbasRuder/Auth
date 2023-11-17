import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js"

// -@desc -> Authenticate(login) a user
// -route -> POST api/users/auth
// -@access -> public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    //- check if both email and password is true
    if (user && (await user.comparePasswords(password))) {
        generateToken(user._id, res)

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(401)
        throw new Error("Invalid email or password")
    }
})

// -@desc -> Register a new user
// -route -> POST api/users
// -@access -> public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const existingUser = await User.findOne({ email }).select("-password")

    if (existingUser) {
        res.status(400)
        throw new Error("User already exists")
    }

    const newUser = await User.create({ name, email, password })
    if (newUser) {
        // -generating jwt token
        generateToken(newUser._id, res)

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
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ message: "User logged out successfully" })
})

// -@desc -> Getting the user profile data
// -route -> GET api/users/profile
// -@access -> private
const getUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    })
})

// -@desc -> Updating the user profile data
// -route -> PUT api/users/profile
// -@access -> private
const updateUserProfile = asyncHandler(async (req, res) => {

    const { email, name, password } = req.body

    const userID = req.user._id
    const user = await User.findById(userID)
    if (user) {
        if (email) user.email = email
        if (name) user.name = name
        // -password hashing will be done by the mongoose pre-hook defined in the userModel 
        if (password) user.password = password

        const newUser = await user.save()

        res.status(200).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}