import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import MyTasks from './MyTasks'
import Projects from './Projects'
import { Routes, Route, Link } from 'react-router-dom'
import corgi from './images/shiba.png'
import './Navbar.css'

const Navbar = ({user, setUser}) => {
    return (
        <div className="navigation">
          <Image roundedCircle src={corgi} alt="corgi" />
          <Nav variant="pills" defaultActiveKey="/" className="nav flex-column">
              <Nav.Item>
                <Nav.Link eventKey="link-1" as={Link} to="/dashboard">Dashboard</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/" as={Link} to="/">Projects</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-2" as={Link} to="/tasks">My Tasks</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-3" as={Link} to="/settings">Settings</Nav.Link>
              </Nav.Item>
              <Button 
                variant="outline-warning"
                onClick={() => {setUser({})}}
              >Logout</Button>{' '}
          </Nav>
        </div>
    )
}

export default Navbar