const express = require('express');
require('dotenv').config();
require("./modles/config")
require('colors')
const app = express();
const mainRoutes = require('./routes/mainRoute')

app.use(express.json());
app.use('/', mainRoutes)

app.listen(8000, () => {
    console.log(`server running on Port no ${process.env.PORT}`)
})
