import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import logo from '../assets/logo.png'
import styles from '../styles/NavBar.module.css'

const NavBar = () => {
  return (
    <Navbar 
    className={styles.NavBar}
    expand="md" fixed="top">
      <Container>
        <Navbar.Brand 
          href="#home">
          <img src={logo} alt="logo" height="75"/>
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="text-left ml-auto">
            <Nav.Link><i className='fas fa-home'></i>Home</Nav.Link>
            <Nav.Link className={styles.oval}><i className='fas fa-sign-in-alt'></i>Sign in</Nav.Link>
            <Nav.Link className={styles.oval}><i className='fas fa-user-plus'></i>Sign up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Container>
</Navbar>
  )
}

export default NavBar;
