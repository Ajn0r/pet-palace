import React from 'react';
import styles from '../../styles/Post.module.css';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Avatar from "../../components/Avatar";

import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { Link } from 'react-router-dom';


const Post = (props) => {

  const {
    id,
    owner,
    profile_id,
    profile_image,
    title,
    content,
    image,
    category,
    updated_at,
    comments_count,
    likes_count,
    like_id,
    postPage
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  return (
    <Card className={`shadow ${styles.Post} `}>
      <Card.Header>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && postPage && "..."}
          </div>
        </Media>
      </Card.Header>
      <Link to={`/posts/${id}`}>
        <Card.Img className={styles.PostImg} src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
        <div>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own post</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={() => {}}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={() => {}}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like posts</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {likes_count}
          <Link to={`/posts/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {comments_count}
        </div>
      </Card.Body>
      <Card.Footer className="text-muted">{category}</Card.Footer>
    </Card>
  );
}

export default Post