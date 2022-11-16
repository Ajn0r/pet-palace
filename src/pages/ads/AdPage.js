import React, { useEffect, useState } from 'react';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import { useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import Ad from './Ad';

function AdPage() {
  const { id } = useParams();
  const [ad, setAd] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: ad }] = await Promise.all([
          (await axiosReq.get(`/ads/${id}`)),
        ]);
        setAd({ results: [ad] });
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [id]);
  console.log(ad)
  
  return (
    <Row>
      <Col>
        <Ad {...ad.results[0]} adPage/>
      </Col>
    </Row>
  )
}

export default AdPage