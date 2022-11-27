import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";

import styles from "../../styles/Pet.module.css";
import appStyles from "../../App.module.css";

import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";


const UsersPets = ({mobile}) => {
  const [ petData, setPetData ] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || '';
  
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/pets/?owner=${profile_id}`)
        setPetData(data);
      } catch (err) {""}
    }
    handleMount();
  }, [profile_id]);


  return (
    petData.results.length && currentUser ? (
    <Container className={`card p-3 mb-4 ${mobile && 'd-lg-none text-center mb-3'}`}>
      {petData.results.length ? (
        <>
          <span className={`ml-2 ${appStyles.SpanText}`}>Your pets</span>
          {mobile ? (
            <div className={`${styles.PetMobile}`}>
              {petData.results.slice(0, 3).map((pet) => (
                <Link
                to={`/pets/${pet.id}`}
                key={pet.id}
                >
                  <Avatar src={pet.image} />
                  <span>{pet.name}</span>
                </Link>
              ))}
              <Link to="/pets">
                <span className="text-center align-items-center">
                  <i className="fas fa-angle-right"></i>
                  All pets
                </span>
              </Link>
            </div>
          ) : (
            petData?.results.map((pet) => (
              <Row className="pl-3 mb-3 align-items-center" key={pet.id}>
                <Link
                  to={`/pets/${pet.id}`}
                >
                  <Avatar src={pet.image} />
                  <span>{pet.name}</span>
                </Link>
              </Row>
            ))
            )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>) : (null)
  );
};

export default UsersPets;