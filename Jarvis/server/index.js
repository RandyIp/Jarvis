require("dotenv").config();
const express = require('express')

const app = express()
const cors = require('cors')
const morgan = require('morgan')
const router = require('./router.js')
app.use(cors())
app.use(morgan('dev'))
app.use(express.json());

app.use('/', router)
app.listen(process.env.PORT || 3000);
console.log(`Listening at http://localhost:${process.env.PORT || 3000}`);