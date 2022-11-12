import React from 'react';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import styles from '../../styles/Profile.module.css';
import btnStyles from '../../styles/Button.module.css';

import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Avatar from '../../components/Avatar';
import { useSetProfileData } from '../../contexts/ProfileDataContext';


const Profile = (props) => {
  const { profile, mobile, imageSize=55 } = props;
  const { id, following_id, image, owner } = profile;
  const { handleFollow, handleUnfollow } = useSetProfileData();
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  
  return (
    <div className={`my-3 d-flex align-items-center ${mobile && 'flex-column'}`}>
      <div>
        <Link className='align-self-center' to={`/profiles/${id}`}>
          <Avatar src={image} height={imageSize}/>
        </Link>
      </div>
      <div className={`mx-2 ${styles.WordBreak}`}>
        <strong>{owner}</strong>
      </div>
      <div className={`text-right ${!mobile && 'ml-auto'}`}>
    {!mobile && currentUser && !is_owner && (
      following_id ? (
        <Button
          className={btnStyles.Button}
          onClick={() => handleUnfollow(profile)}>unfollow</Button>
      ) : (
        <Button
          className={btnStyles.Button}
          onClick={() => handleFollow(profile)}>follow</Button>
      )
    )}
      </div>
    </div>
  )
}

export default Profile;