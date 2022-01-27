import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import './Navbar.css'

const Navbar = ({setUser}) => {
    return (
        <div className="navigation">
            <h1>nav bar</h1>
            <Nav variant="pills" defaultActiveKey="/home" className="nav flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="link-0">Dashboard</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="link-1">Projects</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="disabled">My Tasks</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="link-2">Settings</Nav.Link>
                </Nav.Item>

                <Button 
                  variant="outline-primary"
                  onClick={() => {setUser({})}}
                >Logout</Button>{' '}
            </Nav>
        </div>
    )
}

export default Navbar