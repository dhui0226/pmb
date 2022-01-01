const express = require('express')
const router = express.Router()
const { createProjects, getProjects } = require('../db')


router.get('/todo', async (req, res) => {
    const { userId } = req.body
    try {
        const projects = await getProjects({userId})
        res.send(projects)
    } catch (error) {
        throw error
    }
})

module.exports = router