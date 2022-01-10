const client = require('./client')
const { createUser, createColumn } = require('./users')
const { createProject } = require('./projects')

async function dropTables() {
    try {
        console.log('dropping tables')
        await client.query(`
            DROP TABLE IF EXISTS projects;
            DROP TABLE IF EXISTS "projectColumns";
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
            CREATE TABLE "projectColumns" (
                id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(id),
                type VARCHAR(255) NOT NULL,
                UNIQUE ("userId", type)
            );
            CREATE TABLE projects (
                id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(id),
                "projectColumnId" INTEGER REFERENCES "projectColumns"(id),
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

async function createInitialProjectColumns() {
    console.log('creating init project columns')
    const columnsToCreate = [
        {id: 1, userId: 1, type: 'To Do'},
        {id: 2, userId: 1, type: 'In Progress'},
        {id: 3, userId: 1, type: 'Completed'}
    ]

    const columns = await Promise.all(columnsToCreate.map(createColumn))
}

async function createInititalProject() {
    console.log('creating init projects')
    const projectsToCreate = [
        {userId: 1, projectColumnId: 1, title: 'Leetcode', desc: 'practice data structures'},
        {userId: 1, projectColumnId: 2, title: 'Project', desc: 'code and deploy'},
        {userId: 1, projectColumnId: 3, title: 'Eat Food', desc: 'gotta eat'}
    ]

    const projects = await Promise.all(projectsToCreate.map(createProject))
}

async function rebuildDB() {
    try {
        client.connect()
        await dropTables()
        await buildTables()
        await createInitialUsers()
        await createInitialProjectColumns()
        await createInititalProject()
    } catch (error) {
        console.log('There was an error during rebuildDB')
        throw error
    }
}

module.exports = rebuildDB