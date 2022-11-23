import React, { useState } from 'react';
import { Col, Row, Image, Container, Button, Form, Alert } from 'react-bootstrap';
import image from '../../assets/illustrations/guydogwalking.png';
import styles from '../../styles/SignUpForm.module.css';
import appStyles from '../../App.module.css';
import btnStyles from '../../styles/Button.module.css';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useRedirect } from '../../hooks/useRedirect';

const SignUpForm = () => {
  useRedirect('loggedIn');
  const [signUpData, setSignUpData] = useState({
    username: '',
    password1: '',
    password2: ''
  });

  const { username, password1, password2 } = signUpData;

  const history = useHistory();

  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/dj-rest-auth/registration/', signUpData);
      history.push('/signin');
    } catch (err){
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col sm={12} md={6}
        className={'my-auto p-3'}>
        <Container
          className={`shadow ${styles.Container}`}>
          <h1 className='text-center'>Sign Up</h1>
          <hr className={appStyles.hr}/>
          <Form onSubmit={handleSubmit}>
            <Form.Group
              className="mb-3 mt-3"
              controlId="username">
              <Form.Label className='d-none'>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={username}
                onChange={handleChange}
                />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert variant='warning' key={idx}>{message}</Alert>  
            ))}
            <Form.Group
              className="mb-3"
              controlId="password1">
              <Form.Label className='d-none'>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
                />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
              <Alert variant='warning' key={idx}>{message}</Alert>  
            ))}

            <Form.Group
              className="mb-3"
              controlId="password2">
              <Form.Label className='d-none'>Confirm password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                name="password2"
                value={password2}
                onChange={handleChange}/>
            </Form.Group>
            {errors.password2?.map((message, idx) => (
              <Alert variant='warning' key={idx}>{message}</Alert>  
            ))}

            <Button
              type="submit"
              className={`${btnStyles.Button}`}
              disabled={!username || !password1 || !password2}
            >
              Sign up
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert variant='warning' key={idx}>{message}</Alert>  
            ))}
          </Form>
        </Container>

        <Container
          className='mt-3'>
          <Link className={styles.Link}
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
  );
};

export default SignUpForm;