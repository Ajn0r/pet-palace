import React from "react";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import styles from "../styles/FooterNav.module.css";

const FooterNav = () => {

  const currentUser = useCurrentUser();

  const menuItem = [
    {
      path: '/',
      icon: <i className="fas fa-home"></i>
    },
    {
      path: '/petsittings',
      icon: <i className="fas fa-inbox"></i>
    },
    {
      path: '/posts',
      icon: <i className="fab fa-microblog"></i>
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
      {menuItem.map((item, index)=>(
          <NavLink
            exact
            to={item.path}
            key={index}
            activeClassName="Active">
            <div className="Icon">{item.icon}</div>
  
          </NavLink>
        ))
      }
    </div>
  );

  return (
    currentUser ? (    
      <div className='FooterNav' >
        {loggedInUserFooterBar}
      </div>
      ) : 
      (null)
  )
};

export default FooterNav;