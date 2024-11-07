require('dotenv').config()
const express = require('express')
const connectDB = require('./db/connectDB')
const { createEvent } = require('./controllers/event.controller')

const app = express()
const PORT = process.env.PORT || 5000
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/', createEvent)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    connectDB()
})