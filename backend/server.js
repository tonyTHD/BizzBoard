const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5001

app.use(cors())             //this will allow the forontend to talk to the backend
app.use(express.json())     // this lets the server read JSON from requests

app.get('/', (req,res) => {
    res.send('BizzBoard API is running')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})