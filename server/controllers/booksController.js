    const Book = require("../models/Book")
const asyncHandler = require("express-async-handler")

// GET all books
// Route GET /books

const getAllBooks = asyncHandler(async (req, res) => {
    const books = await Book.find().lean()
    if (!books.length) {
        return res.status(400).json({message: "No books found"})
    }
    res.json(books)
})


// Create new ad for books
// Route POST /books

const createNewBookAd = asyncHandler(async (req, res) => {
    const { title, author, price, state, description } = req.body

    if (!title || !author || !price || !state || !description) {
        return res.status(400).json({ message: "All fields are required"})
    }

    const bookObject = { title, author, price, state, description }

    const book = await Book.create(bookObject)

    if (book) {
        res.status(201).json(book)
    } else {
        res.status(400).json ({ message: "Book advertisement could not be created"})
    }
})

// UPDATE a book
// Route PATCH /book

const updateBookAd = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { title, author, price, state, description } = req.body

    if ( !id || !title || !author || !price || !state || !description) {
        return res.status(400).json({ message: "All fields are required"})
    }

    const book = await Book.findById(id).exec()

    if (!book) {
        return res.status(400).json({ message: "Book could not be found"})
    }

    book.title = title
    book.author = author
    book.price = price
    book.state = state
    book.description = description

    const updatedBookAd = await book.save()

    res.json (updatedBookAd)
})

// Delete a book
// Route DELETE /book

const deleteBookAd = asyncHandler(async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({ message: "Book ID incorrect"})
    }

    const book = await Book.findById(id).exec()

    if (!book) {
        return res.status(400).json({ message: "Book could not be found"})
    }

    const result = await book.deleteOne()

    const reply = `Advertisement for ${result.title} has been deleted`
    
    res.json(reply)
})

module.exports = {
    getAllBooks,
    createNewBookAd,
    updateBookAd,
    deleteBookAd
}