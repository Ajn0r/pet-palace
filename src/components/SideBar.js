import React from 'react'
import { NavLink } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';
import styles from '../styles/SideBar.module.css'

const SideBar = () => {
  const { expanded, setExpanded, ref } = useClickOutsideToggle();
  const currentUser = useCurrentUser();

  const menuItem = [
    {
      path: '/',
      name: 'Home',
      icon: <i className="fas fa-home"></i>
    },
    {
      path: '/messages',
      name: 'Messages',
      icon: <i className="fas fa-inbox"></i>
    },
    {
      path: '/posts',
      name: 'Posts',
      icon: <i className="fab fa-microblog"></i>
    },
    {
      path: '/ads',
      name: 'Ads',
      icon: <i className="fas fa-newspaper"></i>
    },
    {
      path: '/pets',
      name: 'Pets',
      icon: <i className="fas fa-paw"></i>
    },
    {
      path: '/likes',
      name: 'Likes',
      icon: <i className="far fa-heart"></i>
    },
    {
      path: '/followers',
      name: 'Followers',
      icon: <i className="fas fa-users"></i>
    },
    {
      path: '/interests',
      name: 'Interest',
      icon: <i className="far fa-lightbulb"></i>
    },
    {
      path: '/profile',
      name: 'Profile',
      icon: <i className="fas fa-user"></i>
    },
    {
      path: '/ratings',
      name: 'Ratings',
      icon: <i className="far fa-star"></i>
    },
    
  ];

  const loggedInUserSidebar = (
      <div 
        className={styles.Sidebar}
        ref={ref}
        style={{width: expanded ? '10rem' : '3rem'}}
      >
        <div
        className={styles.Top}
        onClick={() => setExpanded(!expanded)}>
          <i style={{display: !expanded ? 'block' : 'none'}}
          className="fas fa-angle-double-right"></i>
          <i style={{display: expanded ? 'block' : 'none'}}
          className="fas fa-times"></i>
        </div>
        {
          menuItem.map((item, index)=>(
            <NavLink
              exact
              to={item.path}
              key={index}
              className="link"
              activeClassName={styles.Active}>
              <div className={styles.icon}>{item.icon}</div>
              <div style={{display: expanded ? "block" : "none"}} className={styles.LinkText}>{item.name}</div>
            </NavLink>
          ))
        }
      </div>
  );

  return (
    <div>
      {currentUser ? loggedInUserSidebar : null}
    </div>
  )
};

export default SideBar;