const { Client } = require('pg')
const client = new Client('https://localhost:5432/pms')

module.exports = client