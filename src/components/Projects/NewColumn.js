import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { addColumn } from '../../utils'
import './NewColumn.css'

const NewColumn = ({user, setNewC}) => {
    const [show, setShow] = useState(false);
    const [columnName, setColumnName] = useState(false)
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (userId, type) => {
        const column = await addColumn({userId, type})
        if (column) {
            await setNewC(true)
            setNewC(false)
            setShow(false)
        }
    }
    
    return (
        <div className="newCol">
            <Button 
                className="newColumnBtn"
                variant="warning" 
                onClick={handleShow}>
              Add Column
            </Button>
        
            <Modal show={show} onHide={handleClose} centered>
              <Modal.Header closeButton>
                <Modal.Title>add new column</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="formColumnName">
                    <Form.Label>Column Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Column Name" onChange={(event) => setColumnName(event.target.value)} />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="warning" onClick={() => {handleSubmit(user.id, columnName)}}>
                  Add
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>
        </div>
    )
}

export default NewColumn