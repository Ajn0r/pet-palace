import React from "react";
import Card from "react-bootstrap/Card";

import { Link, useHistory } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";

import { DropDownManage } from "../../components/DropDownManage";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import styles from "../../styles/Pet.module.css"
import appStyles from "../../App.module.css"


const Pet = (props) => {
  const {
    id,
    owner,
    name,
    description,
    image,
    get_type_display,
    age,
    profile_id,
    petPage,
    setPets,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/pets/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/pets/${id}`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={`${styles.PetCard} text-center shadow`}>
      <Card.Header className="align-items-center justify-content-between d-flex p-3">
        <Link to={`/profiles/${profile_id}`}>
          <span>Pet owner: </span>{owner}
        </Link>
        <div className="d-flex align-items-center">
          {is_owner && petPage && (
            <DropDownManage                  
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          )}
        </div>
      </Card.Header>
      <Link to={`/pets/${id}`}>
        <Card.Img
          alt={`A image of ${owner}'s ${get_type_display} named ${name}`}
          src={image}
          className={`rounded-0 ${appStyles.Image}`}
        />
      </Link>

      <Card.Body>
        <Card.Title className={`mb-0 ${appStyles.Text}`}>
          {name}
        </Card.Title>
        <hr className="mt-0" />
        {description && <Card.Text>{description}</Card.Text>}
        <Card.Text>
          Age: {name} is {age}
        </Card.Text>
      </Card.Body>

      <Card.Footer>
        <small className="text-muted">{get_type_display}</small>
      </Card.Footer>
    </Card>
  )
}

export default Pet;