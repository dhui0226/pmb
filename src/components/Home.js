import Navbar from './Navbar'
import Dashboard from './Dashboard'
import Projects from './Projects'
import MyTasks from './MyTasks'
import { Routes, Route, Link } from 'react-router-dom'
import './Home.css'

const Home = ({user, setUser}) => {
    return (
        <div className="home">
            <Navbar className="boop" user={user} setUser={setUser} />
            {/*<Dashboard />*/}
            {/*<Projects user={user} />*/}
            {/*<MyTasks />*/}
            <Routes>
              <Route exact path="/projects" element={<Projects user={user} />} />
              <Route path="/tasks" element={<MyTasks />} />
            </Routes>
            
        </div>
    )
}

export default Home