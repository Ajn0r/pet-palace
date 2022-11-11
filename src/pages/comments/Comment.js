import React, { useState } from 'react';
import Media from 'react-bootstrap/Media';
import { Link } from 'react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';
import Avatar from '../../components/Avatar';
import { DropDownManage } from '../../components/DropDownManage';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from '../../styles/Comment.module.css'
import CommentEditForm from './CommentEditForm';

const Comment = (props) => {
  const { 
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    setPost,
    setComments,
    id,
  } = props;

  const [ showEditForm, setShowEditForm ] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}`)
      setPost(prevPost => ({
        results: [{
          ...prevPost.results[0],
          comments_count: prevPost.results[0].comments_count - 1
        }]
      }));

      setComments(prevComments => ({
        ...prevComments,
        results: prevComments.results.filter(comment => comment.id !== id)
      }));

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
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
          {showEditForm ? (
            <CommentEditForm 
              id={id}
              profile_id={profile_id}
              content={content}
              profileImage={profile_image}
              setComments={setComments}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <p className='pt-2 pl-2'>{content}</p>
          )}

        </Media.Body>
        { is_owner && !showEditForm && (
          <DropDownManage
            handleDelete={handleDelete}
            handleEdit ={() => setShowEditForm(true)}
          />
        )}
      </Media>
    </>
  )
}

export default Comment