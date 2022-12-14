import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import PopularProfiles from '../profiles/PopularProfiles';
import Pet from './Pet';
import UsersPets from './UsersPets';


function PetPage() {
  const { id } = useParams();
  const [ pet, setPet ] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data: pet } = await axiosReq.get(`/pets/${id}`);
        setPet({results: [pet] });
      } catch (err) {""}
    }
    handleMount();
  }, [id]);

  return (
    <Row className="h-100" >
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <UsersPets mobile />
        <Pet {...pet.results[0]} setPets={setPet} petPage />
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <UsersPets />
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default PetPage;