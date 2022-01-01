const client = require('./client')
const { createUser } = require('./users')
const { createProject } = require('./projects')

async function dropTables() {
    try {
        console.log('dropping tables')
        await client.query(`
            DROP TABLE IF EXISTS "projectsTodo";
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
            CREATE TABLE "projectsTodo" (
                id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(id),
                title VARCHAR(255) NOT NULL,
                description VARCHAR(255)
            );
        `)
        console.log('done building tables')
    } catch (error) {
        console.error('error building tables')
        throw error
    }
}

async function createInitialUsers() {
    console.log('creating init users')
    const usersToCreate = [{username: 'user', password: 'pass'}]

    const users = await Promise.all(usersToCreate.map(createUser))
}

async function createInititalProject() {
    console.log('creating init projects')
    const projectsToCreate = [{userId: 1, title: 'Leetcode', description: 'practice data structures'}]

    const projects = await Promise.all(projectsToCreate.map(createProject))
}

async function rebuildDB() {
    try {
        client.connect()
        await dropTables()
        await buildTables()
        await createInitialUsers()
        await createInititalProject()
    } catch (error) {
        console.log('There was an error during rebuildDB')
        throw error
    }
}

module.exports = rebuildDB