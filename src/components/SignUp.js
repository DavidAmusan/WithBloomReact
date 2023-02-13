import React, {useRef, useState} from 'react'
import Logo from './Logo.png'
import {Form, Container, Nav, Navbar, NavDropdown, Card, Alert } from 'react-bootstrap'
import {useAuth} from '../context/AuthContext'
import './Login.css';
import {Link} from 'react-router-dom'

export default function SignUp (){
    const emailRef= useRef()
    const passwordRef= useRef()
    const passwordConfirmRef= useRef()
    const {signUp} = useAuth()
    const [message, setMessage]= useState("")
    const [loading, setLoading]= useState(false)
    const [alert, setAlert]= useState('')

  async  function submit(e){
        e.preventDefault();
        
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
           return  setMessage('Passwords do not match'),   setAlert('danger')
            
        }

        try{
            setMessage("")
            setLoading(true)
           await signUp(emailRef.current.value, passwordRef.current.value)
           setMessage('Account created')
           setAlert('success')
        }
        catch{
            setMessage('Failed to create account')
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
    <h1 className="titleText"><span className="in">Sign</span><span className="in">Up</span></h1>
    <span className="LoginField">
    {message && <Alert variant={alert}>{message}</Alert>}
    <Form onSubmit={submit}>
      <Form.Group id="email">
      
        <Form.Control type="email" placeholder="Enter your email"  className="mb-2 pr-3" ref={emailRef} required  />
       
      </Form.Group>
      <Form.Group id="password">
      <span className="d-flex">
        <Form.Control type="password"  placeholder="Enter password"  className="mt-2 mb-2 " ref={passwordRef} required minLength={6} />
        </span>
      </Form.Group>
      <Form.Group id="password-confirm">
      <span className="d-flex">
        <Form.Control type="password"  placeholder="confirm your password"  className="mt-2 " ref={passwordConfirmRef} required />
        </span>
        <button type="submit" className="payButton" disabled={loading}>Sign Up </button>
      </Form.Group>
    </Form>
    </span>
    </Card>
    </section>

    </div>
    )
}
