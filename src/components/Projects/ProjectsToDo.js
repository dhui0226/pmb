import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { getProjectToDos } from '../../utils'

const ProjectsToDo = ({user}) => {
    const [todos, setTodos] = useState([])
    const [show, setShow] = useState(false);
    const [newTodo, setNewTodo] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleNewTodo = () => setNewTodo(true);

    useEffect(async () => {
        const projects = await getProjectToDos(user.id)
        await setTodos(projects)
    }, [])

    return (
        <div>
            <h1>To Do</h1>
            <Button 
                variant="primary" 
                onClick={handleNewTodo}
            >Sign Up</Button>
            {todos.map((todo, idx) => (
                <div key={idx}>
                    <Card style={{ cursor: "pointer" }}onClick={handleShow}>
                        <Card.Body>
                          <Card.Title>{todo.title}</Card.Title>
                          <Card.Text>
                            {todo.description}
                          </Card.Text>
                        </Card.Body>
                    </Card>

                    <Offcanvas show={show} onHide={handleClose}>
                        <Offcanvas.Header closeButton>
                          <Offcanvas.Title>{todo.title}</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>{todo.description}</Offcanvas.Body>
                    </Offcanvas>
                </div>
            ))}
            <Modal  onHide={handleClose} centered>
                <Modal.Header closeButton>
                  <Modal.Title>add new todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>task 1</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleClose}>
                    Save Changes
                  </Button>
                </Modal.Footer>
            </Modal>

            
        </div>
    )
}

export default ProjectsToDo