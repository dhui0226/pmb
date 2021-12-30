import Navbar from './Navbar'
import Dashboard from './Dashboard'
import Projects from './Projects'
import MyTasks from './MyTasks'
import './Home.css'

const Home = ({setUser}) => {
    return (
        <div className="home">
            <Navbar setUser={setUser} />
            <Dashboard />
            <Projects />
            <MyTasks />
        </div>
    )
}

export default Home