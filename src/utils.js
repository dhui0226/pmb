import axios from 'axios'

export async function login(username, password) {
    try {
        const { data } = await axios.post('/api/users/login', {username, password})
        return data
    } catch (error) {
        console.error('login fail')
        throw error
    }
}

export async function register(username, password) {
    try {
        const { data } = await axios.post('api/users/register', {username, password})
        return data
    } catch (error) {
        console.error('could not create account')
        throw error
    }
}

export async function getProjectsByUserId(userId) {
    try {
        const { data } = await axios.get(`api/users/${userId}/projects`)
        return data
    } catch (error) {
        console.error('could not get projects')
        throw error
    }
}

export async function getProjectById(projectId) {
    try {
        const { data } = await axios.get(`/api/projects/${projectId}`)
        return data
    } catch (error) {
        throw error
    }
}

export async function addProject({userId, type, title, desc}) {
    try {
        const { data } = await axios.post(`api/projects`, {userId, type, title, desc})
        return data
    } catch (error) {
        throw error
    }
}

export async function test() {
    try {
        const data = await axios.get('/')

        return data
    } catch (error) {
        throw error
    }
}