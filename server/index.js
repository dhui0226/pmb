const path = require('path');
const express = require('express')
const server = express()
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 4000
const { client } = require('./db')
const apiRouter = require('./api')
const cors = require('cors')
const morgan = require('morgan')

client.connect()

server.use(express.static(publicPath));

server.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
 });

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