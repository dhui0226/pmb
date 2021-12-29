import Navbar from './Navbar'
import Button from 'react-bootstrap/Button'
import './Home.css'

const Home = ({setUser}) => {
    return (
        <div>
            <Navbar />
            <Button 
                variant="outline-primary"
                onClick={() => {setUser({})}}
            >Logout</Button>{' '}
        </div>
    )
}

export default Home