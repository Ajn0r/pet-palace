import React from "react";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import styles from "../styles/FooterNav.module.css";

const FooterNav = () => {

  const currentUser = useCurrentUser();

  const menuItem = [
    {
      path: '/petsittings',
      icon: <i className="fas fa-handshake"></i>
    },
    {
      path: '/pets',
      icon: <i className="fas fa-paw"></i>
    },
    {
      path: '/ads',
      icon: <i className="fas fa-newspaper"></i>
    },
  ];

  const loggedInUserFooterBar = (
    <div 
      className={`fixed-bottom container-fluid ${styles.FooterNav}`}
    >
      <NavDropdown
        title={
            <i className={`fas fa-home `}></i>
            }
        id="footerbarScrollingDropdown"
        className={`${styles.Icon}`}
        activeClassName={`${styles.Active}`}
      >
        <NavDropdown.Item
          className={`${styles.BlueIcon}`}
        >
          <NavLink
            exact
            to="/"
            activeClassName={`${styles.Active}`}>
              <i className="fab fa-microblog"></i>All posts
          </NavLink>
        </NavDropdown.Item>
        <NavDropdown.Item
          className={`${styles.BlueIcon}`}
        >
          <NavLink
            to="/following"
            activeClassName={`${styles.Active}`}>
              <i className="fas fa-user-friends"></i>Followed
          </NavLink>
        </NavDropdown.Item>

        <NavDropdown.Item
          className={`${styles.BlueIcon}`}
          activeClassName={`${styles.Active}`}>
          <NavLink
            to="/liked"
            activeClassName={`${styles.Active}`}>
              <i className="icon fas fa-heart"></i>Liked
          </NavLink>
        </NavDropdown.Item>
      </NavDropdown>
      {menuItem.map((item, index)=>(
          <NavLink
            exact
            to={item.path}
            key={index}
            activeClassName={`${styles.Active}`}>
            <div className={`${styles.Icon}`}>{item.icon}</div>
          </NavLink>
        ))
      }
    </div>
  );

  return (
    currentUser &&
      <div className='FooterNav' >
        {loggedInUserFooterBar}
      </div>
  );
};

export default FooterNav;