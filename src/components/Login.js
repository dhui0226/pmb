import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import './Login.css'
import { login, register, test } from '../utils'

const Login = ({setUser}) => {
    const [show, setShow] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function handleSubmit(event, type) {
      console.log('event', type)
      event.preventDefault()

      if (!username || !password) {
        return
      } else {
        try {
          if (type === 'login') {
            const user = await login(username, password)
            setUsername('')
            setPassword('')
            setUser(user)
            console.log('user', user)
          } else if (type === 'register') {
            const user = await register(username, password)
            setUsername('')
            setPassword('')
            setUser(user)
            console.log('user', user)
          }
        } catch (error) {
          throw error
        }
      }
    }
  
    return (
      <div className="login d-flex justify-content-center align-items-center">
              <Form className="text-center">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3">
                    <Form.Control type="email" placeholder="Enter email" onChange={(event) => setUsername(event.target.value)} />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
                  </FloatingLabel>
                </Form.Group>
                <Button 
                  variant="outline-primary"
                  className="o-primary-btn"
                  onClick={() => {
                    handleSubmit(event, 'login')
                  }}>Login</Button>{' '}
                <Button 
                  variant="primary" 
                  onClick={handleShow}
                >Sign Up</Button>
              </Form>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Your Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Email address"
                      className="mb-3">
                      <Form.Control type="email" placeholder="Enter email" onChange={(event) => {setUsername(event.target.value)}} />
                    </FloatingLabel>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <FloatingLabel controlId="floatingPassword" label="Password">
                      <Form.Control type="password" placeholder="Password" onChange={(event) => {setPassword(event.target.value)}} />
                    </FloatingLabel>
                  </Form.Group>
                </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button 
              variant="primary"
              onClick={() => {handleSubmit(event, 'register')}}>Sign Up</Button>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
}

export default Login