const User = require("../models/User")
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")

// GET all users
// Route GET /users

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password").lean()
    if (!users) {
        return res.status(400).json({message: "No users found"})
    }
    res.json(users)
})


// Create new users
// Route POST /users

const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, roles } = req.body

    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required"})
    }

    const duplicate = await User.findOne({ username }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: "Username already exist"})
    }

    const hashedPwd = await bcrypt.hash(password, 10)

    const userObject = { username, "password": hashedPwd, roles}

    const user = await User.create(userObject)

    if (user) {
        res.status(201).json({ message: `New user ${username} created !`})
    } else {
        res.status(400).json ({ message: "User could not be created"})
    }
})

// Delete a user
// Route DELETE /users

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: "User ID incorrect"})
    }

    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: "User could no be found"})
    }

    const result = await user.deleteOne()

    const reply = `User ${result.username} has been deleted`
    
    res.json(reply)
})

module.exports = {
    getAllUsers,
    createNewUser,
    deleteUser
}