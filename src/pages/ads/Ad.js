import React from 'react';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import { Link, useHistory } from 'react-router-dom';

import styles from '../../styles/Ad.module.css';
import appStyles from '../../styles/Post.module.css';
import btnStyles from '../../styles/Button.module.css';
import defaultImage from '../../assets/adimg.jpeg';
import noresults from '../../assets/noresults.png';
import Asset from '../../components/Avatar';
import Avatar from "../../components/Avatar";
import { axiosRes } from '../../api/axiosDefaults';
import { DropDownManage } from '../../components/DropDownManage';

const Ad = (props) => {
  const {
    id,
    owner,
    profile_id,
    title,
    date_from,
    date_to,
    updated_at,
    description,
    get_status_display,
    get_type_display,
    pets,
    status,
    location,
    compensation,
    image,
    adPage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();


  const handleEdit = () => {
    history.push(`/ads/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/ads/${id}`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    {/* Only display the ads that are active or that belongs the the logged in user*/}
      {status === 1 || is_owner ? (
        <Card className={`${styles.Ad}`}>
          <Card.Header className='p-1 p-sm-4'>
            <Media className="align-items-center justify-content-between">
              <Link to={`/profiles/${profile_id}`}>
                {owner}
              </Link>
              <div className="d-flex align-items-center">
                <span>{updated_at}</span>
                {is_owner && adPage && (
                  <DropDownManage
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}/>)}
              </div>
            </Media>
          </Card.Header>
          {image ? (
            <Card.Img variant="top" className={`${styles.AdImg}`} src={image} alt={title} />
          ) : (
            <Card.Img variant="top" className={`${styles.AdImg}`} src={defaultImage} alt={title} />
          )}
          <Card.Body className='text-center'>
            <Card.Title className={appStyles.Text}>{title} <hr /></Card.Title>
            <Card.Text>
              {description}
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Start date: {date_from} - End date: {date_to}</ListGroup.Item>
            <ListGroup.Item>Location: {location}</ListGroup.Item>
            <ListGroup.Item>Compensation: {compensation}</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Card.Link ><i className="fas fa-paper-plane"></i><span className={`${appStyles.SpanText}`}>Send message</span></Card.Link>
            <Card.Link >Another Link</Card.Link>
          </Card.Body>
          <Card.Footer className="text-muted text-center">
            <span className='float-left'>{get_type_display}</span>
            
            {pets?.map((item) => {
              return (
                <span className={`${styles.Pets} m-2`}>{item.name}</span>
              )}
            )}

            <span className='float-right'>{get_status_display}</span>
          </Card.Footer>
        </Card>
      ) : (
        <div className='mx-auto text-center'>
          <div >
            <Image src={noresults} className={` ${styles.NoResults}`}></Image>
          </div>
          <div className='mt-4'>
            <Button
              className={` ${btnStyles.Button}`}
              onClick={() => history.goBack()}
            >
              Go back
            </Button>
          </div>
          </div>
      )}
    </>
  );
}


export default Ad;