import React, { useState } from 'react';
import { Col, Row, Image, Container, Button, Form, Alert } from 'react-bootstrap';
import appStyles from '../../App.module.css';
import btnStyles from '../../styles/Button.module.css';
import styles from '../../styles/SignInForm.module.css';
import { Link, useHistory } from 'react-router-dom';
import image from '../../assets/illustrations/signinimg.png';
import axios from 'axios';
import { useSetCurrentUser } from '../../contexts/CurrentUserContext';
import { useRedirect } from '../../hooks/useRedirect';
import { setTokenTimestamp } from '../../utils/utils';


function SignInForm() {
  const setCurrentUser = useSetCurrentUser();
  useRedirect('loggedIn');

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = signInData;

  const [errors, setErrors] = useState({});

  const history = useHistory();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      history.goBack();
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Row className={styles.Row}>
      <Col sm={12} md={6}
        className={'my-auto p-3'}>
        <Container
          className={`shadow ${styles.Container}`}>
          <h1 className='text-center'>Sign In</h1>
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
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Form.Group
              className="mb-3"
              controlId="password">
              <Form.Label className='d-none'>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
                />
            </Form.Group>
            {errors.password?.map((message, idx) => (
              <Alert variant='warning' key={idx}>{message}</Alert>  
            ))}

            <Button
              type="submit"
              className={`${btnStyles.Button}`}
              disabled={!username || !password}>
              Sign in
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert variant='warning' key={idx}>{message}</Alert>  
            ))}
          </Form>
        </Container>

        <Container
          className='mt-3'>
          <Link className={styles.Link}
            to="/signup">
              Not a Pet Palace member? <span>Sign up today!</span>
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
}

export default SignInForm;