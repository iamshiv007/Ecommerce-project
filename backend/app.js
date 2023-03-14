const express = require('express')
const dotenv = require('dotenv').config()
const app = express()

app.use(express.json())

/** Database connection */
const connect = require('./db')
connect()

/** Routes import */
const router = require('./routes/productRoute')
app.use('/api', router)

const port = process.env.PORT || 7000

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})

