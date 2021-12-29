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

module.exports = {
    createUser,
    getUser
}