const express = require('express');
require('dotenv').config();
const routes = require('./router')

const app = express();


app.use(express.json());
app.use(routes)

app.listen(3000,()=>{
    console.log('server is listening')
})