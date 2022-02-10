const { Client } = require('pg')
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/pms'
let config = { connectionString }

const client = new Client({config})

if (process.env.DATABASE_URL) {
    config.ssl = { rejectUnauthorized: false }
}

module.exports = client