import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Form from 'react-bootstrap/Form'
import { getProjectsByUserId, getProjectById, addProject, getColumnsByUserId } from '../../utils'

const projectType = props => <h1>{props.title}</h1>

const ProjectsToDo = ({user}) => {
    const [todos, setTodos] = useState([])
    const [show, setShow] = useState(false);
    const [newTodoClicked, setNewTodoClicked] = useState(false);
    const [projectCard, setProjectCard] = useState({})

    const [projectTitle, setProjectTitle] = useState('')
    const [projectDesc, setProjectDesc] = useState('')
    const [columnId, setColumnId] = useState('')
    const [columns, setColumns] = useState([])

    const [newP, setNewP] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = async (id) => {
      //GET request to grab info for individual card to display on offcanvas
      //use card id
      const project = await getProjectById(id)
      setProjectCard(project[0])
      setShow(true);
    }

    const handleShowTodoClicked = (columnId) => {
      setColumnId(columnId)
      setNewTodoClicked(true)
    }
    const handleCloseTodo = () => {
      setNewTodoClicked(false)
    }
    const handleAddProject = async (userId, columnId, title, desc) => {
      console.log(userId, columnId, projectTitle, projectDesc)
      const newProject = await addProject({userId, columnId, title, desc})
      console.log('neeeewwww', newProject)
      if (newProject) setNewP(true)
    }

    useEffect(async () => {
        const projects = await getProjectsByUserId(user.id)
        console.log('inner join', projects)
        await setTodos(projects)
        //set this so app doesnt crash when it doesnt have initial data
        await setProjectCard(projects[0])
    }, [newP])

    useEffect(async () => {
      const columns = await getColumnsByUserId(user.id)
      await setColumns(columns)
      console.log('columns', columns)
    }, [])

    return (
      <div>
        {columns.map((column) => (
          <div key={column.id}>
            {projectType({title: column.type})}
            <Button 
              variant="primary" 
              onClick={() => {handleShowTodoClicked(column.id)}} ///////
            >Add Todo</Button>
            {todos.map((todo) => (
              (todo.projectColumnId === column.id) ? <div key={todo.id}>
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
              </div> : null
            ))}
          </div>
        ))}

        {newTodoClicked ? 
          <Modal show={true} onHide={handleCloseTodo} centered>
              <Modal.Header closeButton>
                <Modal.Title>add new todo</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="formProjectTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" onChange={(event) => setProjectTitle(event.target.value)} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formProjectDesc">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Description" onChange={(event) => setProjectDesc(event.target.value)} />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={() => {handleAddProject(user.id, columnId, projectTitle, projectDesc)}}>
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