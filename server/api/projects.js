const express = require('express')
const router = express.Router()
const { createProject, getProject } = require('../db')

router.get('/:projectId', async (req, res) => {
    const { projectId } = req.params

    try {
        const project = await getProject({projectId})
        res.send(project)
    } catch (error) {
        console.error('error getting project card')
        throw error
    }
})

router.post('/', async (req, res) => {
    const { userId, projectColumnId, title, desc } = req.body

    try {
        const newProject = await createProject({userId, projectColumnId, title, desc})
        res.send(newProject)
    } catch (error) {
        throw error
    }
})

module.exports = router