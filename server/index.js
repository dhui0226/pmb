const express = require('express')
const server = express()
const port = 4000

server.get('/', (req, res) => {
    res.send('Hello')
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})