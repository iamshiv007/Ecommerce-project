const express = require('express')
const { newOrder, getAllOrders, updateOrder, deleteOrder, getSingleOrder, myOrders } = require('../controllers/orderController')
const router = express.Router()

router.route('/products').get(getAllOrders)
router.route('/product/new').post(newOrder)
router.route('/product/:id').put(updateOrder).delete(deleteOrder).get(getSingleOrder)

module.exports = router