import ProjectsToDo from './ProjectsToDo'
import ProjectsInProgress from './ProjectsInProgress'
import ProjectsCompleted from './ProjectsCompleted'
import './index.css'

const Projects = ({user}) => {
    return (
        <div className='projectsContainer'>
            <ProjectsToDo user={user} />
            <ProjectsInProgress />
            <ProjectsCompleted />
        </div>
    )
}

export default Projects