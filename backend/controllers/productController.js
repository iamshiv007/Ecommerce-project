const  Product = require('../models/productModels') 

// Create new product (admin)
exports.createProduct = async (req, res, next) => {

      const product = await Product.create(req.body)
      res.status(201).json({ success:true, product})
    
    
}

// Get all products
exports.getAllProducts = async (req, res) => {

        const products = await Product.find()
        res.status(200).json(products)
    
}

// Update a product (admin)
exports.updateProduct = async (req, res) => {

    const product = await Product.findOne({id:req.params.id})
    if(!product){
        return res.status(404).json({
            success:false,
            message:"Product not found"
        })
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
}

// Delete a product (admin)

exports.deleteProduct = async (req, res) => {

    const product = await Product.findOne({id:req.params.id})

    if(!product){
        return res.status(404).json({
            success:false,
            message:"Product not found"
        })
    } 
        await Product.findByIdAndDelete(req.params.id)

        res.status(200).json({
            success:true,
            message:"Product deleted successfully"
        })
    

}

exports.getProductDetails = async (req, res) => {

    const product = await Product.findOne(req.params.id)

    if(!product){
        res.status(404).json({
            success:false,
            message:"Product not found"
        })
    }

    res.status(200).json({
        success:true,
        product
    })


}