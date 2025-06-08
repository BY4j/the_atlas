require("dotenv").config()
const express = require('express')
const cors = require('cors');
const app = express()
const path = require("path")
const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/dbConn")
const mongoose = require("mongoose")
const port = 3500

console.log(process.env.NODE_ENV)

connectDB()

app.use(express.json())

app.use(cors(corsOptions))

app.use("/", express.static(path.join(__dirname, "/public")))

app.use("/", require("./routes/index"))

app.use("/books", require("./routes/bookRoutes.js"))

app.all("*", (req, res) => {
  res.status(404).send("404 Not Found");
})


mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB")
  app.listen(port, () => {
    console.log(`App running on port ${port}`)
  })
})

mongoose.connection.on("error", err => {
  console.log(err)
})