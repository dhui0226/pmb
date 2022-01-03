const express = require('express')
const router = express.Router()
const { createUser, getUser, getProjects } = require('../db')

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

        res.send(user)
    } catch (error) {
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