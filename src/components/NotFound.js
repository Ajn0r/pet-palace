import React from 'react';
import NoResult from '../assets/noresults.png';
import Asset from './Asset';

const NotFound = () => {
  return (
    <div>
        <Asset src={NoResult} message={"Sorry, couldn't find what you are looking for!"}/>
    </div>
  )
}

export default NotFound;