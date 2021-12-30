import Navbar from './Navbar'
import Button from 'react-bootstrap/Button'
import Projects from './Projects'
import './Home.css'

const Home = ({setUser}) => {
    return (
        <div className="home">
            <Navbar setUser={setUser} />
            <Projects />
        </div>
    )
}

export default Home