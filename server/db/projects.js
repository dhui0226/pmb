const client = require('./client')

async function createProject({userId, columnId, title, desc}) {
    const { rows } = await client.query(`
        INSERT INTO projects("userId", "projectColumnId", title, description)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `, [userId, columnId, title, desc])

    return rows
}

async function getProjects({userId}) {
    const { rows } = await client.query(`
        SELECT projects.id, projects."userId", projects."projectColumnId", title, description, type
        FROM projects
        LEFT JOIN "projectColumns"
            ON "projectColumnId" = "projectColumns".id
        WHERE projects."userId" = ($1)
    `, [userId])

    return rows
}

async function getProject({projectId}) {
    const { rows } = await client.query(`
        SELECT *
        FROM projects
        WHERE id = ($1)
    `, [projectId])

    return rows
}

module.exports = {
    createProject,
    getProjects,
    getProject
}