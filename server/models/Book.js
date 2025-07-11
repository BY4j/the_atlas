const mongoose = require("mongoose")
const bookSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        enum: ["new", "good", "used"],
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Book", bookSchema)