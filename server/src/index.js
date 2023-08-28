const express = require("express")
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
require("dotenv").config()
const mongoose = require('mongoose')
const {notFound, errorHandler} = require('./middlewares')
const logs = require("./api/logs")

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 3000

const main = async () => {
    await mongoose.connect(MONGO_URL)
}

main().then(console.log).catch(console.error)

const app = express()

app.use(morgan("common"))
app.use(helmet())
app.use(cors({
    origin: 'http://localhost:3001'
}))
app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        message: "Hello World"
    })
})

app.use('/api/logs', logs)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Listening at https://localhost:${PORT}`)
})