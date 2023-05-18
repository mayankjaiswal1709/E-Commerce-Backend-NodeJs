const fs = require('fs')
require('dotenv').config()
const bcrypt = require('bcrypt')
const userSchema = require('../modles/userSchema')


// user Signup Api
const userSignup = async (req, res) => {
    const { userEmail, userPassword } = req.body
    const newUser = new userSchema(req.body);
    try {
        const existingUser = await userSchema.findOne({ userEmail: userEmail })
        if (existingUser) {
            await fs.unlink(req.file.path)
            return res.status(409).json({
                success: true,
                message: "Your email is already registered, Try again!!"
            })
        } else {
            newUser.userPassword = await bcrypt.hash(userPassword, 10)
            newUser.userProfilePic = `/uploads/${(req.file.filename)}`;
            await newUser.save();
            return res.status(200).json({
                success: true,
                message: "Registaration successfull"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }

}

// login Api

    module.exports = {
        userSignup,
    }