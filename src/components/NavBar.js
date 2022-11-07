import React from 'react'
import { Container, NavDropdown, Nav, Navbar } from 'react-bootstrap';
import logo from '../assets/logo.png';
import smlogo from '../assets/pawlogo.png'
import styles from '../styles/NavBar.module.css';
import { NavLink } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import axios from 'axios';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post('dj-rest-auth/logout/');
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const loggedInIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        to="/"
        onClick={handleSignOut}
        >
        <i className='fas fa-sign-out-alt'></i>Sign out
      </NavLink>
      {currentUser?.username}
    </>
  );
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
  const newIcon = (
    <> 
      <NavDropdown
        title={
          <span>
            <i className='fas fa-plus-circle'></i>
            New
          </span>}
        id="navbarScrollingDropdown"
        className={`${styles.NewBtn} ml-auto`}
      >
        <NavDropdown.Item
          to="/posts"
          className={
            `${styles.NavLink} ${styles.DropDownItem}`}>
              New post
        </NavDropdown.Item>
        <NavDropdown.Item
          to="/"
          className={
            `${styles.NavLink} ${styles.DropDownItem}`}>
              New ad
        </NavDropdown.Item>
      </NavDropdown>
    </>
  )

  return (
    <Navbar
      expanded={expanded}
      className={styles.NavBar}
      expand="md" fixed="top"
    >
      <Container fluid>
        <NavLink to="/"
          className={styles.LogoLink}>
          <Navbar.Brand 
            href="#home"
            className={styles.Logo}>
            <img src={logo} alt="logo"
              className={`${styles.BigLogo} d-none`} />
            <img src={smlogo} alt="logo"
              className={`${styles.SmLogo}`}/>
          </Navbar.Brand>
        </NavLink>
        {currentUser && newIcon}
        <Navbar.Toggle
          onClick={() => setExpanded(!expanded)}
          ref={ref}
          className={styles.Toggle}
          aria-controls="basic-navbar-nav"/>
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
