const client = require('./client')

async function createProject({userId, type, title, desc}) {
    const { rows } = await client.query(`
        INSERT INTO "projectsTodo"("userId", type, title, description)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `, [userId, type, title, desc])

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

async function getProject({projectId}) {
    const { rows } = await client.query(`
        SELECT *
        FROM "projectsTodo"
        WHERE id = ($1)
    `, [projectId])

    return rows
}

module.exports = {
    createProject,
    getProjects,
    getProject
}