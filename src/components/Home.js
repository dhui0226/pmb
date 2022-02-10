import Navbar from './Navbar'
import Projects from './Projects'
import { Routes, Route } from 'react-router-dom'
import './Home.css'

const Home = ({user, setUser}) => {
    return (
        <div className="home">
            <Navbar user={user} setUser={setUser} />
            <Routes>
              <Route exact path="/" element={<Projects user={user} />} />
              {/*<Route path="/tasks" element={<MyTasks />} />*/}
            </Routes> 
        </div>
    )
}

export default Home