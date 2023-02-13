import React, {useRef, useState} from 'react'
import Logo from './Logo.png'
import {Form, Container, Nav, Navbar, NavDropdown, Card, Alert } from 'react-bootstrap'
import {useAuth} from '../context/AuthContext'
import './Login.css';
import {Link, useNavigate} from 'react-router-dom'

import './Login.css';

export default function LogIn (){
    const emailRef= useRef()
    const passwordRef= useRef()
    const {login} = useAuth()
    const [message, setMessage]= useState("")
    const [loading, setLoading]= useState(false)
    const navigate= useNavigate()
    async  function submit(e){
        e.preventDefault();
        

        try{
            setMessage("")
            setLoading(true)
            console.log('work')
           await login(emailRef.current.value, passwordRef.current.value)
           navigate("/")
        }
        catch{
            setMessage('Unable to authenticate user')
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
            <Nav.Link><Link to={'/signup'}><button type="submit" className="payButton">Sign Up</button></Link>
</Nav.Link>
      </Container>
    </Navbar>
    <section className='title'>
    <Card>
    <h1 className="titleText"><span className="in">Log</span><span className="in">in</span></h1>
    <span className="LoginField">
    {message && <Alert variant="danger">{message}</Alert>}
    <Form onSubmit={submit}>
      <Form.Group id="email">
      
        <Form.Control type="email" placeholder="Enter your email"  className="mb-2" ref={emailRef} required />
       
      </Form.Group>
      <Form.Group id="password">
      <span className="d-flex">
        <Form.Control type="password"  placeholder="Enter password"  className="mt-2" ref={passwordRef} required minLength={6} />
        </span>
        <button type="submit" className="payButton">Log In</button>
        <p>Forgot your <span><Link to='/forgotpassword' style={{color:"#020032"}}>password?</Link></span></p>
      </Form.Group>
    </Form>
    </span>
    </Card>
    </section>

    </div>
    )
}
