const express = require('express')
const router = express.Router()
const { createProjects, getProjects } = require('../db')


router.get('/:userId', async (req, res) => {
    const { userId } = req.params

    try {
        const projects = await getProjects({userId})
        res.send(projects)
    } catch (error) {
        throw error
    }
})

module.exports = router