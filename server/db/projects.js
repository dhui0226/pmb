const client = require('./client')

async function createProject({userId, title, description}) {
    const { rows } = await client.query(`
        INSERT INTO "projectsTodo"("userId", title, description)
        VALUES ($1, $2, $3)
        RETURNING *
    `, [userId, title, description])

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