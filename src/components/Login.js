import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import './Login.css'
import { login, test } from '../utils'

const Login = ({setUser}) => {
    const [show, setShow] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function handleSubmit(event) {
      event.preventDefault()
      
      const newUser = await login(username, password)

      if (newUser) {
        setUser(newUser)
      }

      //const something = await test()
      //console.log(something)
      //console.log('login comp', newUser)
      
      /*if (newUser.username) {
          setUsername('')
          setPassword('')
          setUser(newUser)
      }*/
      console.log('newuser', newUser)
    }
  
    return (
      <div className="login d-flex justify-content-center align-items-center">
              <Form className="text-center">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                  >
                    <Form.Control type="email" placeholder="Enter email" onChange={(event) => {setUsername(event.target.value)}} />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control type="password" placeholder="Password" onChange={(event) => {setPassword(event.target.value)}} />
                  </FloatingLabel>
                </Form.Group>
                <Button 
                  variant="outline-primary"
                  onClick={() => {
                    handleSubmit(event)
                  }}>
                    Login
                </Button>{' '}
                <Button 
                  variant="primary" 
                  //type="submit" 
                  onClick={handleShow}
                >Sign Up</Button>
              </Form>
           
        
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            I will not close if you click outside me. Don't even try to press
            escape key.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary">Understood</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
}

export default Login