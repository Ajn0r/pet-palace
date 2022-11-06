import React from 'react';
import { Col, Row, Image, Container, Button, Form } from 'react-bootstrap';
import image from '../../assets/illustrations/guydogwalking.png';
import styles from '../../styles/SignUpForm.module.css';
import appStyles from '../../App.module.css'
import btnStyles from '../../styles/Button.module.css'
import { Link } from 'react-router-dom';


const SignUpForm = () => {
  return (

    <Row className={styles.Row}>
      <Col sm={12} md={6}
        className={'my-auto p-3'}>
        <Container>
          <h1 className='text-center'>Sign Up</h1>
          <hr className='w-50'/>
          <Form>
            <Form.Group
              className="mb-3 mt-3"
              controlId="username">
              <Form.Label className='d-none'>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"/>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="password1">
              <Form.Label className='d-none'>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password1"
                />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="password2">
              <Form.Label className='d-none'>Confirm password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                name="password2"/>
            </Form.Group>
            <Button
              type="submit"
              className={btnStyles.Button}>
              Sign up
            </Button>
          </Form>
        </Container>
        <Container
          className='mt-3'>
          <Link
            to="/signin">
              Already have an account? <span>Sign in</span>
          </Link>
        </Container>
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