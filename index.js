const express = require('express');
require('dotenv').config();
require("./modles/config")
const mainroutes = require('./routes/mainRoute')
const app = express();
require('colors')
// const Razorpay = require('razorpay');

app.use(express.json());
app.use('/', mainroutes)


// const instance = new Razorpay({
//     key_id: process.env.RAZORPAY_API_KEY,
//     key_secret: process.env.RAZORPAY_API_SECRET,
// });


const server = app.listen(process.env.PORT, () => {
    console.log(`server running on Port no ${process.env.PORT}`)
})
module.exports = { server} //instance }
