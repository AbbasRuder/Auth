import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
import asyncHandler from "express-async-handler"

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token
    token = req.cookies.jwt

    if (token) {
        try {
            // -verifies the token using the secret and returns the decoded payload
            const decode = jwt.verify(token, process.env.JWT_SECRET)

            const user = await User.findById(decode.userId).select("-password")
            req.user = user
            next()
        } catch (error) {
            res.status(401)
            throw new Error("User not authorized")
        }
    } else {
        res.status(401)
        throw new Error("Unauthorized without token")
    }
})

export { authMiddleware }