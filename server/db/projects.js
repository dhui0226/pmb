const client = require('./client')

async function createProject({userId, type, title, description}) {
    const { rows } = await client.query(`
        INSERT INTO "projectsTodo"("userId", type, title, description)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `, [userId, type, title, description])

    return rows
}

async function getProjects({userId}) {
    const { rows } = await client.query(`
        SELECT *
        FROM "projectsTodo"
        WHERE "userId" = ($1)
    `, [userId])

    return rows
}

module.exports = {
    createProject,
    getProjects
}