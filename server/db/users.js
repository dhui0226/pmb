const client = require('./client')

async function createUser({username, password}) {
    const { rows: [ user ] } = await client.query(`
        INSERT INTO users(username, password)
        VALUES ($1, $2)
        RETURNING *
    `, [username, password])

    return user
}

async function getUser({username, password}) {
    const user = await getUserByUsername(username)

    if (user.password === password) {
        return user
    }
}

async function getUserByUsername(username) {
    const { rows: [ user ] } = await client.query(`
        SELECT *
        FROM users
        WHERE username = ($1)
    `, [username])

    return user
}

async function createColumn({userId, type}) {
    const { rows } = await client.query(`
        INSERT INTO "projectColumns" ("userId", type)
        VALUES ($1, $2)
        RETURNING *
    `, [userId, type])

    return rows
}

async function getColumns({userId}) {
    const { rows } = await client.query(`
        SELECT *
        FROM "projectColumns"
        WHERE "userId" = ($1)
        ORDER BY id ASC
    `, [userId])

    return rows
}

module.exports = {
    createUser,
    getUser,
    createColumn,
    getColumns
}