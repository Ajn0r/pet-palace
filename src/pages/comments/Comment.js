import React from 'react';
import Media from 'react-bootstrap/Media';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import styles from '../../styles/Comment.module.css'

const Comment = (props) => {
  const { 
    profile_id,
    profile_image,
    owner,
    updated_at,
    content } = props;

  return (
    <div>
      <hr className={styles.Hr} />
      <Media>
        <Link
          to={`profiles/${profile_id}`}>
          <Avatar src={profile_image}/>
        </Link>
        <Media.Body>
          <span
            className={styles.Username}>
              {owner}
            </span>
          <span className={`ml-2 text-muted ${styles.Timestamp}`}><em>{updated_at}</em></span>
          <p className='pt-2 pl-2'>{content}</p>
        </Media.Body>
      </Media>
    </div>
  )
}

export default Comment