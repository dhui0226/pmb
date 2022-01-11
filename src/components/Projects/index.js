import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { getProjectsByUserId, getProjectById, addProject, getColumnsByUserId } from '../../utils'
import './index.css'

const projectType = props => <h1>{props.title}</h1>

const ProjectColumns = ({user}) => {
    const [projects, setProjects] = useState([])
    const [show, setShow] = useState(false);
    const [isOpen, setIsOpen] = useState(false)

    const [newProjectClicked, setNewProjectClicked] = useState(false);
    const [projectCard, setProjectCard] = useState({})

    const [projectTitle, setProjectTitle] = useState('')
    const [projectDesc, setProjectDesc] = useState('')
    const [columnId, setColumnId] = useState('')
    const [columns, setColumns] = useState([])

    const [newP, setNewP] = useState(false)

    const handleShow = async (id) => {
      //GET request to grab info for individual card to display on offcanvas
      //use card id
      const project = await getProjectById(id)
      setProjectCard(project[0])
      setShow(true);
    }
    const handleClose = () => setShow(false);

    const handleDropdown = (id) => {
      console.log(`scooby doo ${id}`)
    }

    const handleShowNewProject = (columnId) => {
      //modal for creating a new project card
      setColumnId(columnId)
      setNewProjectClicked(true)
    }
    const handleCloseNewProject = () => {
      setNewProjectClicked(false)
    }

    const handleAddProject = async (userId, columnId, title, desc) => {
      console.log(userId, columnId, projectTitle, projectDesc)
      const newProject = await addProject({userId, columnId, title, desc})
      console.log('neeeewwww', newProject)

      if (newProject) {
        await setNewP(true)
        setNewProjectClicked(false)
        setNewP(false)
      }
    }

    useEffect(async () => {
        const projects = await getProjectsByUserId(user.id)
        console.log('inner join', projects)
        await setProjects(projects.reverse())
        //set this so app doesnt crash when it doesnt have initial data
        await setProjectCard(projects[0])
    }, [newP])

    useEffect(async () => {
      const columns = await getColumnsByUserId(user.id)
      await setColumns(columns.reverse())
      console.log('columns', columns)
    }, [])

    return (
      <div>
        {columns.map((column) => (
          <div key={column.id}>
            {projectType({title: column.type})}
            <Button 
              variant="primary" 
              onClick={() => {handleShowNewProject(column.id)}}
            >+</Button>
            {projects.map((project) => (
              (project.projectColumnId === column.id) ? <div key={project.id}>
                <Card style={{ cursor: "pointer" }} onClick={() => {handleShow(project.id)}}>
                    <Card.Body>
                      <Card.Title>{project.title}</Card.Title>
                      <Card.Text>
                        {project.description}
                      </Card.Text>
                    </Card.Body>
                </Card>

                <Offcanvas show={show} onHide={handleClose}>
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{projectCard.title}</Offcanvas.Title>
                    <DropdownButton id="dropdown-basic-button" title="Move">
                      {columns.map((column) => (
                        <div key={column.id}>
                          <Dropdown.Item onClick={() => {handleDropdown(column.id)}}>{column.type}</Dropdown.Item>
                        </div>
                      ))}
                    </DropdownButton>
                  </Offcanvas.Header>
                  <Offcanvas.Body>{projectCard.description}</Offcanvas.Body>
                </Offcanvas>
              </div> : null
            ))}
          </div>
        ))}

        {newProjectClicked ? 
          <Modal show={true} onHide={handleCloseNewProject} centered>
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
                <Button variant="secondary" onClick={handleCloseNewProject}>
                  Cancel
                </Button>
              </Modal.Footer>
          </Modal> : null
        } 
      </div>
    )
}

export default ProjectColumns