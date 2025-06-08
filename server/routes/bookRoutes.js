const express = require('express')
const router = express.Router()
const booksController = require("../controllers/booksController")

router.route("/")
    .get(booksController.getAllBooks)
    .post(booksController.createNewBookAd)

router.route("/:id")
    .put(booksController.updateBookAd)
    .delete(booksController.deleteBookAd)

module.exports = router