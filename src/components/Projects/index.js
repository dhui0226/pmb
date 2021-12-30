import ProjectsToDo from './ProjectsToDo'
import ProjectsInProgress from './ProjectsInProgress'
import ProjectsCompleted from './ProjectsCompleted'
import './index.css'

const Projects = () => {
    return (
        <div className='projectsContainer'>
            <ProjectsToDo />
            <ProjectsInProgress />
            <ProjectsCompleted />
        </div>
    )
}

export default Projects