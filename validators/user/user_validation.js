const validUserSchema = require('../user/validation_UserSchema')

module.exports = {
    registerUserValidation: async (req, res, next) => {
        const value = validUserSchema.registerUser.validate(req.body, { abortEarly: false })
        if (value.error) {
            res.json({
                success: false,
                message: value.error.details[0].message
            })
        } else {
            next();
        }
    },
}