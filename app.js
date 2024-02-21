const express = require('express');
const app = express()
require('dotenv').config();
const route = require('./routes/route')
app.use('/api',route)
app.listen(process.env.PORT,()=>{
    console.log('lisining on port : ',process.env.PORT);
})