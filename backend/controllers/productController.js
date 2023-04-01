const  Product = require('../models/productModels') 
const ErrorHandler = require('../utils/errorhandler')
const catchAsyncError = require('../middleware/catchAsyncErrors')

// Create new product (admin)
exports.createProduct = catchAsyncError(async (req, res, next) => {

      const product = await Product.create(req.body)
      res.status(201).json({ success:true, product})

})

// Get all products
exports.getAllProducts = catchAsyncError(async (req, res) => {

        const products = await Product.find()
        res.status(200).json(products)
    
})

// Update a product (admin)
exports.updateProduct = catchAsyncError(async (req, res, next) => {

    const product = await Product.findOne({id:req.params.id})
    if(!product){
        return next(new  ErrorHandler("Product not Found", 404))
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });

    res.status(200).json({
        success:true,
        message: "Product updated successfully"
    })
})

// Delete a product (admin)

exports.deleteProduct = catchAsyncError(async (req, res, next) => {

    const product = await Product.findOne({id:req.params.id})

    if(!product){
        return next(new  ErrorHandler("Product not Found", 404))
    } 
        await Product.findByIdAndDelete(req.params.id)

        res.status(200).json({
            success:true,
            message:"Product deleted successfully"
        })
    
})

exports.getProductDetails = catchAsyncError(async (req, res, next) => {

    const product = await Product.findOne({id:req.params.id})

    if(!product){
        return next(new  ErrorHandler("Product not Found", 404))
    }

    res.status(200).json({
        success:true,
        product
    })

})