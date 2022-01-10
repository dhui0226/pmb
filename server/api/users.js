const express = require('express')
const router = express.Router()
const { createUser, getUser, getColumns, getProjects, createColumn, createProject } = require('../db')

router.post('/login', async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await getUser({username, password})
        res.send(user)
    } catch (error) {
        console.error('could not post')
        throw error
    }
})

router.post('/register', async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await createUser({username, password})

        const columnsToCreate = [
            {userId: user.id, type: 'To Do'},
            {userId: user.id, type: 'In Progress'},
            {userId: user.id, type: 'Completed'}
        ]
        columnsToCreate.map(async (column) => {
            const userColumns = await createColumn(column)
            await createProject({userId: user.id, columnId: userColumns[0].id, title: 'Project Card', desc: 'Description of your project'})
        })

        res.send(user)
    } catch (error) {
        throw error
    }
})

router.get('/:userId/projectColumns', async (req, res) => {
    const { userId } = req.params

    try {
        const projectColumns = await getColumns({userId})
        res.send(projectColumns)
    } catch (error) {
        console.error('could not get columns')
        throw error
    }
})

router.get('/:userId/projects', async (req, res) => {
    const { userId } = req.params

    try {
        const projects = await getProjects({userId})
        res.send(projects)
    } catch (error) {
        throw error
    }
})

router.get('/', (req, res) => {
    res.send('this is working')
})

module.exports = router