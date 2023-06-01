const fs = require('fs')
require('dotenv').config()
const bcrypt = require('bcrypt')
const userSchema = require('../modles/userSchema')
const jwt = require('jsonwebtoken')
const transpoter = require('../services/mailService')


// user Signup Api
const userSignup = async (req, res) => {
    const { userEmail, userPassword } = req.body
    const newUser = new userSchema(req.body);
    try {
        const existingUser = await userSchema.findOne({ userEmail: userEmail })
        if (existingUser) {
            fs.unlinkSync(req.file.path)
            res.status(409).json({
                success: false,
                message: "Your email is already registered, Try again!!"
            })
        } else {
            newUser.userPassword = await bcrypt.hash(userPassword, 10)
            newUser.userProfilePic = `/uploads/${(req.file.filename)}`;
            await newUser.save();
            res.status(200).json({
                success: true,
                message: "Registaration successfull"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

// user login Api
const userLogin = async (req, res) => {
    const { userEmail, userPassword } = req.body
    try {
        const userData = await userSchema.findOne({ userEmail: userEmail })
        if (!userData) {
            return res.status(200).json({
                success: false,
                message: "Email id not found"
            })
        } else {
            const passwordMatch = await bcrypt.compare(userPassword, userData.userPassword)
            if (userData && passwordMatch) {
                const token = jwt.sign({ userId: userData._id }, process.env.JWT, { expiresIn: "5d" })
                res.status(200).json({
                    success: true,
                    message: "Login Success",
                    token: token
                })

            } else {
                res.status(401).json({
                    success: false,
                    message: "Invalid user password",
                })

            }
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

// user forget api 
const forgetPassword = async (req, res) => {
    const { userEmail } = req.body
    const userData = await userSchema.findOne({ userEmail: userEmail })
    try {
        if (userData != null) {
            let token = jwt.sign({ userId: userData._id }, process.env.jwt, { expiresIn: "10m" })
            const resetPasswordLink = `http://127.0.0.1.27017/api/user/resetpassword/${userData._id}/${token}`
            await transpoter.sendMail({
                from: process.env.Email,
                to: req.body.userEmail,
                subject: "Reset Password Link",
                html: `<p> below link is valid only for 5 minutes</p><a heref=${resetPasswordLink}> click on link to reset the password </a>`,
            })
            res.status(200).json({
                success: true,
                message: "Mail sent successfull",
                token: token,
                UserId: userData._id,
            })
        } else {
            res.status(404).json({
                success: false,
                message: "Email not found",
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

// reset password
const resetPassword = async (req, res) => {
    const { userId, token } = req.params;
    const { newPassword, confirmPassword } = req.body;
    try {
        const User = await userSchema.findById(userId);
        if (User != null) {
            jwt.verify(token, process.env.JWT);
            if (newPassword == confirmPassword) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(confirmPassword, salt);
                await userSchema.findByIdAndUpdate(User._id),
                {
                    $set: {
                        userPassword: hashedPassword
                    },
                };
                res.status(200).json({
                    success: true,
                    message: "passsword updated successfuly",
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: "password and confimPassword does not match "
                });
            }
        } else {
            res.status(404).json({
                success: false,
                message: "email user is not found"
            });
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    userSignup, userLogin, forgetPassword, resetPassword
}
