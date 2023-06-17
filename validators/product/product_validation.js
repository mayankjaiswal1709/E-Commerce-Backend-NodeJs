// const validProductSchema = require('../product/validation_ProductSchema')

// module.exports = {
//     productValidation: async (req, res, next) => {
//         const value = validProductSchema.addProducts.validate(req.body, { abortEarly: false })
//         if (value.error) {
//             res.json({
//                 success: false,
//                 message: value.error.details[0].message
//             })
//         } else {
//             next();
//         }
//     },
// }