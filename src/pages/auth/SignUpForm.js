import React from 'react';
import { Col, Row, Image } from 'react-bootstrap';
import image from '../../assets/illustrations/guydogwalking.png';
import styles from '../../styles/SignUpForm.module.css';
import appStyles from '../../App.module.css'


const SignUpForm = () => {
  return (
    <Row className={styles.Row}>
      <Col sm={12} md={6}>
        <h1>Hello</h1>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2`}>
        <Image
          src={image}
          className={appStyles.FillerImage}
          />
      </Col>
    </Row>
  )
}

export default SignUpForm;