const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    inventoryStatus: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    rating: {
        type: Number,
        required: false,
    },
})

module.exports = mongoose.model("Product", productsSchema);