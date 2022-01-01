import { useState, useEffect } from 'react'
import Cards from './Cards'
import { getProjectToDos } from '../../utils'

const ProjectsToDo = ({user}) => {
    const [todos, setTodos] = useState([])

    useEffect(async () => {
        console.log('usertodo', user)
     
        const projects = await getProjectToDos(user.id)
        await setTodos(projects)
        console.log('todo', todos)
    }, [])

    return (
        <div>
            <h1>
                To Do
            </h1>
            <Cards />
            {
                todos.map((thing, idx) => (
                    <div key={idx}>
                        <h1>{thing.title}</h1>
                        <h1>{thing.description}</h1>
                    </div>
                ))
            }
        </div>
    )
}

export default ProjectsToDo