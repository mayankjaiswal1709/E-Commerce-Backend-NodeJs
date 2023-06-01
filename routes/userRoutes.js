const express = require('express')
const router = express.Router();
const user = require('../controllers/userControler')
const validate = require('../validators/user/user_validation')
const { upload } = require('../middwlwear/imageStorage')


router.post('/signupuser', upload.single('userProfilePic'), validate.registerUserValidation, user.userSignup)
router.post('/loginuser', user.userLogin)
router.post('/forgetpassworduser', user.forgetPassword)
router.post('/restpassworduser/:userId/:token', user.resetPassword)

module.exports = router