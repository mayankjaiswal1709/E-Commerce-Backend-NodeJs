const mongoose = require("mongoose");
require("dotenv").config();
require('colors')
mongoose.connect(process.env.url,{useNewUrlParser: true});
const connection = mongoose.connection;
mongoose.set("strictQuery",false);
connection.once('open',()=>{
    console.log("MOngoDb Database connection establish successfull".bgWhite);
})
