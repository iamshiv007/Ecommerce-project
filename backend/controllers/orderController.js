const Order = require('../models/orderModel')
const Product = require('../models/productModel')
const ErrorHandler = requier('../utils/errorHandler')
const catchAsyncError = require('../middleware/catchAsyncErrors')

// Create New Order

exports.newOrder = catchAsyncError( async (req, res, next) => {
    const  {
        shippingInfo,
        orderItems,
        // user,
        paymentInfo,
        // paidAt,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        // orderStatus
        // deleveredAt,
        // createdAt
    } = req.body

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id
    })

    res.status(201).json({
        success:true,
        order
    })
})

// Get Single order

exports.getSingleOrder = catchAsyncError( async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        "name email"
    )

    if(!order) {
        return next(ErrorHandler("Order not Found with this id", 404))
    }

    res.status(200).json({
        success:true,
        order
    })
})

// Get logged in user's Orders
exports.myOrders = catchAsyncError( async (req, res, next) => {
    const orders = req.find({user:req.user._id})

    res.status(200).json({
        success:true,
        orders
    })
})

// Get all orders -- admin
exports.getAllOrders = catchAsyncError( async (req, res, next) => {
    const orders = await Order.find()

    const totalAmount = 0

    orders.forEach((order) => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success:true,
        totalAmount,
    })
})

// Update Order status -- admin
exports.updateOrder = catchAsyncError( async (req, res, next) => {
    const order = await Order.findById(req.params.id)


    if(!order){
        return next(new ErrorHandler("Order not found with this id", 404))
    }

    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler("You have already delivered this error", 404))
    }

    if(req.body.status === "Shipped"){
        order.orderItems.forEach(async (o) => {
            await updateStock(o.product, o.quantity)
        })
    }
    order.orderStatus = req.body.status

    if(req.body.status === 'Delivered') {
        order.deliveredAt = Date.now()
    }

    await order.save({validateBeforeSave: false})

    res.status(200).json({
        success:true
    })

    async function updateStock(id, quantity) {
        const product = Product.findById(id)

        product.stock -= quantity

        await product.save({validateBoforeSave: false})
    }
})

// Delete Oreder -- admin

exports.deleteOrder = catchAsyncError( async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if(!order) {
        return next(new ErrorHandler("Order not found with this id", 404))
    }

    await order.remove()

    res.status(200).json({
        success:true
    })
}) 