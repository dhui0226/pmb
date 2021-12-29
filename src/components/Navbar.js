import Nav from 'react-bootstrap/Nav'
import './Navbar.css'

const Navbar = () => {
    return (
        <div>
            <h1>nav bar</h1>
            <Nav variant="pills" defaultActiveKey="/home" className="nav flex-column">
                <Nav.Item>
                  <Nav.Link>Dashboard</Nav.Link>
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
            </Nav>
        </div>
    )
}

export default Navbar