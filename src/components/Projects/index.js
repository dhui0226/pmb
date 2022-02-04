import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { getProjectsByUserId, getProjectById, addProject, getColumnsByUserId, updateProjectColumn, editProjectCard, deleteProjectCard, getProjectCountForColumn } from '../../utils'
import NewColumn from './NewColumn'
import './index.css'

const projectType = props => <h3 className="columnName">({props.count ? props.count : 0}) {props.title}</h3>

const ProjectColumns = ({user}) => {
    const [projects, setProjects] = useState([])
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const [newProjectClicked, setNewProjectClicked] = useState(false);
    const [projectCard, setProjectCard] = useState({})

    const [projectTitle, setProjectTitle] = useState('')
    const [projectDesc, setProjectDesc] = useState('')
    const [editTitle, setEditTitle] = useState('')
    const [editDesc, setEditDesc] = useState('')

    const [columnId, setColumnId] = useState('')
    const [columns, setColumns] = useState([])
    const [columnCount, setColumnCount] = useState([])

    const [newP, setNewP] = useState(false)
    const [newC, setNewC] = useState(false)

    const handleShow = async (id) => {
      //GET request to grab info for individual card to display on offcanvas
      //use card id
      const project = await getProjectById(id)
      setProjectCard(project[0])
      setShow(true);
    }
    const handleClose = () => {
      setShow(false)
      setShowEdit(false)
    }
    const handleShowEdit = (title, description, btn) => {
      if (btn === 'edit') {
        setShowEdit(true)

      } else if (btn === 'cancel') {
        setShowEdit(false)
      }
      setEditTitle(title)
      setEditDesc(description)
    }

    const handleEditProject = async (projectId, newTitle, newDesc) => {
      const project = await editProjectCard({projectId, newTitle, newDesc})
      console.log('edited', project)
      if (project) {
        await setNewP(true)
        setNewP(false)
        setShow(false)
        setShowEdit(false)
      }
    }

    const handleDropdown = async (projectId, newColumnId) => {
      console.log(`scooby doo ${projectId}, ${newColumnId}`)
      //create route to change project type in db
      const newColumn = await updateProjectColumn(projectId, newColumnId)
      console.log('new column', newColumn)
      if (newColumn) {
        await setNewP(true)
        setNewP(false)
        setShow(false)
      }
    }

    const handleDelete = async (projectId) => {
      const project = await deleteProjectCard(projectId)
      if (project) {
        await setNewP(true)
        setNewP(false)
        handleClose()
      }
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
        const pCount = await getProjectCountForColumn(user.id)
        console.log('inner join', projects)
        console.log('count dis', pCount)
        await setColumnCount(pCount)
        await setProjects(projects.reverse())
        //set this so app doesnt crash when it doesnt have initial data
        await setProjectCard(projects[0])
    }, [newP])

    useEffect(async () => {
      const columns = await getColumnsByUserId(user.id)
      //loops through columns and attaches # of projects under each column since they are pulled from separate API calls
      columns.map(column => {
        columnCount.map(count => {
          if (column.id === count.projectColumnId) {
            column.count = count.count
          } 
        })
      })

      await setColumns(columns)
      console.log('columns', columns)
    }, [newC])

    return (
      <div className='projectThing'>
        {columns.map((column) => (
          <div key={column.id} className='column'>
            <div className="titleArea">
              {projectType({count: column.count, title: column.type})}
                <Button
                  className="newCardBtn" 
                  variant="primary" 
                  onClick={() => {handleShowNewProject(column.id)}}
                >+</Button>
            </div>
            <div className="scrollDis">
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
                      <Offcanvas.Title>
                        {showEdit ?
                          <Form.Control 
                            type="text" 
                            defaultValue={projectCard.title}
                            onChange={(event) => setEditTitle(event.target.value)} /> 
                          : projectCard.title
                        }
                      </Offcanvas.Title>
                      {/*Edit button*/}
                      <Button 
                        variant="primary"
                        size="sm"
                        onClick={() => handleShowEdit(projectCard.title, projectCard.description, 'edit')}
                      >Edit</Button>{' '}
                      <DropdownButton id="dropdown-basic-button" size="sm" title="Move">
                        {columns.map((column) => (
                          <div key={column.id}>
                            <Dropdown.Item onClick={() => {handleDropdown(projectCard.id, column.id)}}>{column.type}</Dropdown.Item>
                          </div>
                        ))}
                      </DropdownButton>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                      {showEdit ?
                        <Form>
                          <Form.Control 
                            type="text" 
                            defaultValue={projectCard.description}
                            onChange={(event) => setEditDesc(event.target.value)} />
                          <div className="editBtn">
                            <Button 
                              variant="primary"
                              size="sm"
                              onClick={() => {handleEditProject(projectCard.id, editTitle, editDesc)}}
                            >Save</Button>{' '}
                            <Button 
                              variant="primary"
                              size="sm"
                              onClick={() => handleShowEdit(null, null, 'cancel')}
                            >Cancel</Button>{' '}
                          </div>
                        </Form>
                        : 
                        <div>
                          {projectCard.description}
                          <Button 
                            className='deleteBtn' 
                            variant="primary"
                            onClick={() => handleDelete(projectCard.id)}
                          >Delete</Button>{' '}
                        </div>
                      }
                    </Offcanvas.Body>
                  </Offcanvas>
                </div> : null
              ))}
            </div>
          </div>
        ))}
        <NewColumn user={user} setNewC={setNewC} />

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