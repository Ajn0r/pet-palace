import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import logo from '../assets/logo.png'
import styles from '../styles/NavBar.module.css'
import { NavLink } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';

const NavBar = () => {
  const currentUser = useCurrentUser();

  const loggedInIcons = <>{currentUser?.username}</>
  const loggedOutIcons = (
    <>
      <NavLink
        to="/signin"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className='fas fa-sign-in-alt'></i>Sign in
      </NavLink>
      
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className='fas fa-user-plus'></i>Sign up
      </NavLink>
    </>
  );

  return (
    <Navbar 
    className={styles.NavBar}
    expand="md" fixed="top">
      <Container fluid>
        <NavLink to="/">
        <Navbar.Brand 
          href="#home">
          <img src={logo} alt="logo" height="70"/>
          </Navbar.Brand></NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="text-left ml-auto">
            <NavLink
              exact
              to="/"
              className={styles.NavLink}
              activeClassName={styles.Active}
              >
                <i className='fas fa-home'></i>Home
              </NavLink>

            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
    </Container>
</Navbar>
  )
}

export default NavBar;
