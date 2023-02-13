import React, {useRef, useState} from 'react'
import {Form, Container, Nav, Navbar, NavDropdown, Card, Alert } from 'react-bootstrap'
import {useAuth} from '../context/AuthContext'
import './Login.css';
import {Link} from 'react-router-dom'

export default function ForgotPassword() {
    const emailRef= useRef()
    const {resetpassword} = useAuth()
    const [message, setMessage]= useState("")
    const [loading, setLoading]= useState(false)
    const [alert, setAlert]= useState('')

  async  function submit(e){
        e.preventDefault();
    

        try{
            setMessage("")
            setLoading(true)
           await resetpassword(emailRef.current.value)
           setMessage('Please check your email for recovery link')
           setAlert('success')
        }
        catch{
            setMessage('Failed to reset password')
            setAlert('danger')
            setLoading(false)
        }
        setLoading(false)
    }
    return (
       
        <div id= "wrapper"> 
     <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="https://www.payourse.com/"><h1 className="LogoText">WithBloom</h1></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav.Link><Link to={'/login'}><button type="submit" className="payButton">Log In</button></Link>
</Nav.Link>
      </Container>
    </Navbar>
    <section className='title'>
    <Card>
    <h3 className="titleText"><span className="in">Password </span><pre></pre><span className="in">Recovery</span></h3>
    <span className="LoginField">
    {message && <Alert variant={alert}>{message}</Alert>}
    <Form onSubmit={submit}>
      <Form.Group id="email">
      
        <Form.Control type="email" placeholder="Enter your email"  className="mb-2 pr-3" ref={emailRef} required  />
       
      </Form.Group>
      <button type="submit" className="payButton" disabled={loading}>Reset</button>
    </Form>
    </span>
    </Card>
    </section>

    </div>
    )
}
