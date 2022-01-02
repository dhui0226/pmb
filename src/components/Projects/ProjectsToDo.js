import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { getProjectToDos } from '../../utils'

const projectType = props => <h1>{props.title}</h1>

const ProjectsToDo = ({user}) => {
    const [todos, setTodos] = useState([])
    const [show, setShow] = useState(false);
    const [newTodoClicked, setNewTodoClicked] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleShowTodoClicked = () => {
      setNewTodoClicked(true)
    }
    const handleCloseTodo = () => {
      setNewTodoClicked(false)
    }

    useEffect(async () => {
        const projects = await getProjectToDos(user.id)
        await setTodos(projects)
        console.log('testtest', todos)
    }, [])

    return (
      <div>
        <Button 
            variant="primary" 
            onClick={handleShowTodoClicked}
        >Add Todo</Button>
        {todos.map((todo, idx) => (
            <div key={idx}>
                {projectType({title: todo.type})}
                <Card style={{ cursor: "pointer" }} onClick={handleShow}>
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
                <Button variant="primary" onClick={handleClose}>
                  Add
                </Button>
                <Button variant="secondary" onClick={handleCloseTodo}>
                  Cancel
                </Button>
              </Modal.Footer>
          </Modal> : null
        } 
      </div>
    )
}

export default ProjectsToDo