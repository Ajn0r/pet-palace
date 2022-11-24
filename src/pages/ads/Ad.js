import React from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import ListGroup from "react-bootstrap/ListGroup";

import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/Ad.module.css";
import appStyles from "../../styles/Post.module.css";

import defaultImage from "../../assets/adimg.jpeg";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { DropDownManage } from "../../components/DropDownManage";

const Ad = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
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
    contact,
    adPage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const date = new Date().toISOString();
  const passed_to_date = (date_to <= date);

  const handleEdit = () => {
    history.push(`/ads/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/ads/${id}`);
      history.goBack();
    } catch (err) {
    }
  };

  return (
    <>
    {/* Only display the ads that are active/ havn't passed to date
       or that belongs the the logged in user*/}
      {(!passed_to_date|| is_owner) && (status === 1 || is_owner) ? (
        <Card className={`${styles.Ad} mt-4 mb-5 shadow`}>
          <Card.Header>
            <Media className="align-items-center justify-content-between">
              
              <Link to={`/profiles/${profile_id}`}>
                <Avatar src={profile_image} height={55} />
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
          <Link to={`/ads/${id}`}>
            {image ? (
              <Card.Img variant="top" className={`${styles.AdImg}`} src={image} alt={title} />
            ) : (
              <Card.Img variant="top" className={`${styles.AdImg}`} src={defaultImage} alt={title} />
            )}
          </Link>
          <Card.Body className="text-center">
            <Card.Title className={appStyles.Text}>{title} <hr /></Card.Title>
            <Card.Text>
              {description}
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Start date: {date_from} - End date: {date_to}</ListGroup.Item>
            <ListGroup.Item>Location: {location}</ListGroup.Item>
            <ListGroup.Item>Compensation: {compensation}</ListGroup.Item>
            {contact && (
              <ListGroup.Item>How to contact me: {contact}</ListGroup.Item>
            )}
            
          </ListGroup>
          <Card.Footer className="text-muted text-center">
            <span className="float-left">{get_type_display}</span>
            
            {pets?.map((item) => {
              return (
                <span className={`${styles.Pets} m-2`} key={item.id}>{item.name}</span>
              )}
            )}

            <span className="float-right">{get_status_display}</span>
          </Card.Footer>
        </Card>
      ) : (
        null
      )}
    </>
  );
};


export default Ad;