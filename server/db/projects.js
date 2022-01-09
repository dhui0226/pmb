const client = require('./client')

async function createProject({userId, projectColumnId, title, desc}) {
    const { rows } = await client.query(`
        INSERT INTO "projects"("userId", "projectColumnId", title, description)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `, [userId, projectColumnId, title, desc])

    return rows
}

async function getProjects({userId}) {
    const { rows } = await client.query(`
        SELECT *
        FROM "projects"
        WHERE "userId" = ($1)
    `, [userId])

    return rows
}

async function getProject({projectId}) {
    const { rows } = await client.query(`
        SELECT *
        FROM "projects"
        WHERE id = ($1)
    `, [projectId])

    return rows
}

async function createColumn({userId, type}) {
    const { rows } = await client.query(`
        INSERT INTO "projectColumns" ("userId", type)
        VALUES ($1, $2)
        RETURNING *
    `, [userId, type])

    return rows
}

module.exports = {
    createProject,
    getProjects,
    getProject,
    createColumn
}