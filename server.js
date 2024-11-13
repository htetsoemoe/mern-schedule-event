require('dotenv').config()
const express = require('express')
const connectDB = require('./db/connectDB')
const eventRouter = require('./routes/event.route')

const app = express()
const PORT = process.env.PORT || 5000
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/event', eventRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    connectDB()
})