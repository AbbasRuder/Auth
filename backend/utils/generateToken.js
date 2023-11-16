import jwt from 'jsonwebtoken'

const generateToken = (userId, res) => {
    // -jwt.sign({ payload }, secret, { options })
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30d" })

    res.cookie("jwt", token, {
        httpOnly: true, //-when true, cookie only accessible through web server
        secure: process.env.NODE_ENV !== "development", //-when true, cookie usable only with https
        sameSite: "strict", // -prevents CSRF attacks
        maxAge: 30 * 24 * 60 * 60 * 1000 //- 30days in milliseconds
    })
}

export default generateToken