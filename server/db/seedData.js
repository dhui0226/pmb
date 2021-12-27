const client = require('./client')
const { createUser } = require('./users')

async function dropTables() {
    try {
        console.log('dropping tables')
        await client.query(`
            DROP TABLE IF EXISTS users;
        `)
    } catch (error) {
        console.error('error dropping tables')
        throw error
    }
}

async function buildTables() {
    try {
        console.log('building tables')
        await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL 
            );
        `)
    } catch (error) {
        console.error('error building tables')
        throw error
    }
}

async function createInitialUsers() {
    const usersToCreate = [{username: 'user', password: 'pass'}]

    const users = await Promise.all(usersToCreate.map(createUser))
}

async function rebuildDB() {
    try {
        client.connect()
        await dropTables()
        await buildTables()
        await createInitialUsers()
    } catch (error) {
        console.log('There was an error during rebuildDB')
        throw error
    }
}

module.exports = rebuildDB