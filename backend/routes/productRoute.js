const express = require('express')
const { createProduct, getAdminProducts, getAllProducts, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productController')
const { isAuthenticateUser, authorizeRoles } = require('../middleware/auth')
const router = express.Router()

router.route('/products').get(isAuthenticateUser, authorizeRoles("Admin"), getAllProducts)
router.route('/admin/product/new').post(isAuthenticateUser, authorizeRoles("Admin"), createProduct)
router.route('/product/:id').put(updateProduct).delete(deleteProduct).get(getProductDetails)

module.exports = router