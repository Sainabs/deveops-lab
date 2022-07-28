const express = require('express')
const app = express()
const path = require('path')


app.use(express.json())



const port = process.env.PORT || 5055



app.listen(port, () => console.log(`Server listening on ${port}`))
