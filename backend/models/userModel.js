import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

// -this runs before saving anything in database
userSchema.pre('save', async function (next) {
    // -"this" here refers to the current document being saved or modified
    if (!this.isModified("password")) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

// -adds the fn comparePasswords() to documents created using Models constructed from userSchema
userSchema.methods.comparePasswords = async function (typedPassword) {
    try {
        // -comparing the given password with the hashed password
        return await bcrypt.compare(typedPassword, this.password)
    } catch (error) {
        throw new Error("Error in comparing passwords")
    }
}

const User = mongoose.model('User', userSchema)

export default User