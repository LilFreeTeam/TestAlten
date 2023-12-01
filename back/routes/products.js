const express = require('express');
const router = express.Router();
const Product = require("../models/products");


// **/products** - GET - Retrieve all products
router.get("/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
})


// **/products** - POST - Create a new products
router.post("/products", async (req, res) => {
    const products = new Product({
        code: req.body.code,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        inventoryStatus: req.body.inventoryStatus,
        category: req.body.category,
        image: req.body.image,
        rating: req.body.rating
    });

    try {
        const newProducts = await products.save();
        res.status(201).json(newProducts);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
})


// **/products/1** - GET - Retrieve details for product 1
router.get("/products/:id", getProduct, (req, res) => {
    res.json(res.product);
})


// **/products/1** - PATCH - Update details of product 1 if it exists
router.patch("/products/:id", getProduct, async (req, res) => {
    if(req.body.code != null) {
        res.product.code = req.body.code;
    }
    if(req.body.name != null) {
        res.product.name = req.body.name;
    }
    if(req.body.description != null) {
        res.product.description = req.body.description;
    }
    if(req.body.price != null) {
        res.product.price = req.body.price;
    }
    if(req.body.quantity != null) {
        res.product.quantity = req.body.quantity;
    }
    if(req.body.inventoryStatus != null) {
        res.product.inventoryStatus = req.body.inventoryStatus;
    }
    if(req.body.category != null) {
        res.product.category = req.body.category;
    }
    if(req.body.image != null) {
        res.product.image = req.body.image;
    }
    if(req.body.rating != null) {
        res.product.rating = req.body.rating;
    }

    try {
        const updatedProduct = await res.product.save();
        res.json(updatedProduct);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
})


// **/products/1** - DELETE - Remove product 1
router.delete("/products/:id", getProduct, async (req, res) => {
    try {
        await res.product.deleteOne();
        res.json({message: "Product deleted"});
    } catch(err) {
        res.status(500).json({message: err.message});
    }
})


//Middleware Product
async function getProduct(req, res, next) {
    let product;
    try {
        product = await Product.findById(req.params.id);
        if(product == null) {
            return res.status(404).json({message: "Not found"});
        }
    } catch(err) {
        return res.status(500).json({message: err.message});
    }

    res.product = product;
    next();
}

module.exports = router;