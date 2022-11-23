import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';
import '../styles/SideBar.css';

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
      path: '/petsittings',
      name: 'Messages',
      icon: <i className="fas fa-handshake"></i>
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
      path: '/liked',
      name: 'Likes',
      icon: <i className="far fa-heart"></i>
    },
    
  ];

  const loggedInUserSidebar = (
    <div 
      className={`${expanded ? 'Open' : 'Closed'}`}
      ref={ref}
    >
      <div
        className="Top"
        onClick={() => setExpanded(!expanded)}>
          {expanded ? (
            <i className="fas fa-times"></i>
          ) : (
            <i className="fas fa-angle-double-right"></i>
          )}
      </div>
      {
        menuItem.map((item, index)=>(
          <NavLink
            exact
            to={item.path}
            key={index}
            className={`Link ${expanded ? 'Open' : 'Closed'}`}
            activeClassName="Active">
            <div className="Icon">{item.icon}</div>
            <div className="LinkText">{item.name}</div>
          </NavLink>
        ))
      }
    </div>
  );

  return (
    currentUser ? (    
      <div className='SideBar'>
        {loggedInUserSidebar}
      </div>
      ) : 
      (null)
  );
};

export default SideBar;