import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { getProjectToDos } from '../../utils'

const ProjectsToDo = ({user}) => {
    const [todos, setTodos] = useState([])
    const [show, setShow] = useState(false);
    const [newTodoClicked, setNewTodoClicked] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleTodoClicked = () => {
      setNewTodoClicked(true)
      console.log('state', newTodoClicked)
    }
    const handleCloseTodo = () => {
      setNewTodoClicked(false)
      console.log('state 2', newTodoClicked)
    }

    useEffect(async () => {
        const projects = await getProjectToDos(user.id)
        await setTodos(projects)
    }, [])

    return (
        <div>
            <h1>To Do</h1>
            <Button 
                variant="primary" 
                onClick={handleTodoClicked}
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

            {newTodoClicked ? 
                <Modal show={true} onHide={handleCloseTodo} centered>
                    <Modal.Header closeButton>
                      <Modal.Title>add new todo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>task 1</Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseTodo}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={handleClose}>
                        Save Changes
                      </Button>
                    </Modal.Footer>
                </Modal> : <div>
                  <h1>Lol</h1>
                </div>
            } 
        </div>
    )
}

export default ProjectsToDo