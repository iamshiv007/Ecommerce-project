const Product = require('../models/productModels')
const ErrorHandler = require('../utils/errorhandler')
const catchAsyncError = require('../middleware/catchAsyncErrors')
const ApiFeatures = require('../utils/apiFeatures')

// Create new product (admin)
exports.createProduct = catchAsyncError(async (req, res, next) => {

    const product = await Product.create(req.body)
    res.status(201).json({ success: true, product })

})

// Get all products
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();
  
    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage)
      
      apiFeature

    let products = await apiFeature.query;
  
    let filteredProductsCount = products.length;
  
  
  
    res.status(200).json({
      success: true,
      products,
      productsCount,
      resultPerPage,
      filteredProductsCount,
    });
  });

// Get all products -- Admin
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
    const products = await Product.find()

    res.status(200).json({
        success: true,
        products
    })
})

// Update a product (admin)
exports.updateProduct = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler("Product not Found", 404))
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        message: "Product updated successfully"
    })
})

// Delete a product (admin)

exports.deleteProduct = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("Product not Found", 404))
    }
    await Product.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    })

})

// Get Product Detail
exports.getProductDetails = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("Product not Found", 404))
    }

    res.status(200).json({
        success: true,
        product
    })

})

// Create new review or update the review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId)
    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString())

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = rating
                rev.comment = comment
            }
        })
    } else {
        product.reviews.push(review)
    }

    let avg = 0

    product.reviews.forEach((rev) => {
        avg += rev.rating
    })

    product.numOfReviews = product.reviews.length

    product.ratings = avg / product.reviews.length

    await product.save({ valdateBeforeSave: false })

    res.status(200).json({
        success: true,
        product
    })
})

// Get all reviews of a Product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId)

    if (!product) {
        return next(new ErrorHandler("Product not Found", 404))
    }

    res.status(404).json({
        success: true,
        reviews: product.reviews
    })
})

// Delete Review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId)

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id)

    let avg = 0

    reviews.forEach((rev) => {
        avg += rev.rating
    })

    let ratings = avg / (reviews.length || 1)

    const numOfReviews = reviews.length

    await Product.findByIdAndUpdate(req.query.productId,
        {
            ratings,
            numOfReviews,
            reviews
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    )

    res.status(200).json({
        success: true
    })

})