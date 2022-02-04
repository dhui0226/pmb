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

async function getProjectCount({userId}) {
    const { rows } = await client.query(`
        SELECT "projectColumnId", COUNT("projectColumnId")
        FROM projects
        WHERE "userId" = ($1)
        GROUP BY "projectColumnId"
    `, [userId])

    return rows
}

async function editProject({projectId, newTitle, newDesc}) {
    const { rows } = await client.query(`
        UPDATE projects
        SET title = ($2), 
            description = ($3)
        WHERE id = ($1)
        RETURNING *
    `, [projectId, newTitle, newDesc])

    return rows
}

async function deleteProject({projectId}) {
    const { rows } = await client.query(`
        DELETE FROM projects
        WHERE id = ($1)
        RETURNING *
    `, [projectId])

    return rows
}

async function updateColumn({projectId, newColumnId}) {
    const { rows } = await client.query(`
        UPDATE projects
        SET "projectColumnId" = ($2)
        WHERE id = ($1)
        RETURNING *
    `, [projectId, newColumnId])

    return rows
}

module.exports = {
    createProject,
    getProjects,
    getProject,
    getProjectCount,
    editProject,
    deleteProject,
    updateColumn
}