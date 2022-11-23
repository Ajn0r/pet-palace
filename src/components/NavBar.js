import React from 'react'
import { Container, NavDropdown, Nav, Navbar } from 'react-bootstrap';
import logo from '../assets/logo.png';
import smlogo from '../assets/pawlogo.png'
import styles from '../styles/NavBar.module.css';
import { NavLink } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import axios from 'axios';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';
import Avatar from './Avatar';

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post('dj-rest-auth/logout/');
      setCurrentUser(null);
    } catch (err) {
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
      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}>
          <Avatar
            src={currentUser?.profile_image}
            text={currentUser?.username}
            height={40}
        />

      </NavLink>
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
          className={
            `${styles.NavLink} ${styles.DropDownItem}`}>
          <NavLink
            to="/posts/create">
              New post
          </NavLink>
        </NavDropdown.Item>

        <NavDropdown.Item
          className={
            `${styles.NavLink} ${styles.DropDownItem}`}>
          <NavLink
            to="/ads/create">
              New ad
          </NavLink>
        </NavDropdown.Item>

        <NavDropdown.Item
          className={
            `${styles.NavLink} ${styles.DropDownItem}`}>
          <NavLink
            to="/pets/create">
              New pet
          </NavLink>
        </NavDropdown.Item>

        <NavDropdown.Item
          className={
            `${styles.NavLink} ${styles.DropDownItem}`}>
          <NavLink
            to="/petsittings/create">
              New petsitting
          </NavLink>
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );

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
            <NavLink
              exact
              to="/contact"
              className={styles.NavLink}
              activeClassName={styles.Active}
            >
              <i className='fas fa-address-book'></i>Contact
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
