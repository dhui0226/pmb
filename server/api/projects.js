const express = require('express')
const router = express.Router()
const { createProjects, getProject } = require('../db')

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

module.exports = router