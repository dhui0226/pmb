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

export async function test() {
    try {
        const data = await axios.get('/')

        return data
    } catch (error) {
        throw error
    }
}