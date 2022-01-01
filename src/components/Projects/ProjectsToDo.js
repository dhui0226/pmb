import { useState, useEffect } from 'react'
import Cards from './Cards'
import { getProjectToDos } from '../../utils'

const ProjectsToDo = ({user}) => {
    const [todos, setTodos] = useState([])

    useEffect(async () => {
        console.log('usertodo', user)
        console.log(user.id)
        const projects = await getProjectToDos(user.id)
        setTodos(projects)
        console.log('todo', projects)
    }, [])

    return (
        <div>
            <h1>
                To Do
            </h1>
            <Cards />
            <h1>comehting{todos.title}</h1>
        </div>
    )
}

export default ProjectsToDo