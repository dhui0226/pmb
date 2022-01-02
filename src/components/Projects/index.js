import ProjectsToDo from './ProjectsToDo'
import ProjectsInProgress from './ProjectsInProgress'
import ProjectsCompleted from './ProjectsCompleted'
import './index.css'

const Projects = ({user}) => {
    return (
        <div className='projectsContainer'>
            <ProjectsToDo user={user} />
            {/*<ProjectsInProgress user={user} />
            <ProjectsCompleted user={user} />*/}
        </div>
    )
}

export default Projects