import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { getProjectsByUserId, getProjectById } from '../../utils'

const projectType = props => <h1>{props.title}</h1>

const ProjectsToDo = ({user}) => {
    const [todos, setTodos] = useState([])
    const [show, setShow] = useState(false);
    const [newTodoClicked, setNewTodoClicked] = useState(false);
    const [projectCard, setProjectCard] = useState({})

    const handleClose = () => setShow(false);
    const handleShow = async (id) => {
      //GET request to grab info for individual card to display on offcanvas
      //use card id
      const project = await getProjectById(id)
      setProjectCard(project[0])
      setShow(true);
    }

    const handleShowTodoClicked = () => {
      setNewTodoClicked(true)
    }
    const handleCloseTodo = () => {
      setNewTodoClicked(false)
    }

    useEffect(async () => {
        const projects = await getProjectsByUserId(user.id)
        await setTodos(projects)
        //set this so app doesnt crash when it doesnt have initial data
        await setProjectCard(projects[0])
        console.log('testtest', todos)
    }, [])

    return (
      <div>
        <Button 
            variant="primary" 
            onClick={handleShowTodoClicked}
        >Add Todo</Button>
        {todos.map((todo) => (
            <div key={todo.id}>
                {projectType({title: todo.type})}
                <Card style={{ cursor: "pointer" }} onClick={() => {handleShow(todo.id)}}>
                    <Card.Body>
                      <Card.Title>{todo.title}</Card.Title>
                      <Card.Text>
                        {todo.description}
                      </Card.Text>
                    </Card.Body>
                </Card>

                <Offcanvas show={show} onHide={handleClose}>
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{projectCard.title}</Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>{projectCard.description}</Offcanvas.Body>
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