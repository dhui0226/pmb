const express = require('express')
const server = express()
const port = 4000
const { client } = require('./db')
const apiRouter = require('./api')
const cors = require('cors')
const morgan = require('morgan')

client.connect()

server.use(cors())
server.use(express.json())
server.use(morgan('tiny'))

server.get('/', (req, res) => {
    console.log('server is working')
    res.send({message: 'server get'})
})

server.use('/api', apiRouter)

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})