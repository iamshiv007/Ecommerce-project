const router = require('express').Router()

// Product 
const product = require('./productRoute')
const user = require("./userRoute")
router.use('/', product)
router.use('/', user)


module.exports =  router