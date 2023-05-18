const express = require('express')
const router = express.Router();
const user = require('../controllers/userControler')
const validate = require('../validators/user/user_validation')
const { upload } = require('../middwlwear/imageStorage')


router.post('/signup', upload.single("userProfilePic"), validate.registerUserValidation, user.userSignup)

module.exports = router