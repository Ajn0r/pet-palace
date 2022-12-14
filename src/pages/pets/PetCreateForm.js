import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';

import UploadImg from '../../assets/uploadimage.png';
import styles from "../../styles/Pet.module.css";
import appStyles from '../../App.module.css';
import btnStyles from '../../styles/Button.module.css';

import Asset from '../../components/Asset';
import { axiosReq } from '../../api/axiosDefaults';
import { useRedirect } from '../../hooks/useRedirect';
import { Container, Row } from 'react-bootstrap';

function PetCreateForm () {
  useRedirect('loggedOut');
  const [ errors, setErrors ] = useState({});
  const [ options, setOptions ] = useState([]);

  const [ petData, setPetData ] = useState({
    name: '',
    type: '',
    description: '',
    image: '',
    date_of_birth: '',
  });

  // Fetching all pet type choices from the API
  useEffect(() => {
    try {
      axiosReq.options('/pets/').then((response) => {
        setOptions(response.data.actions.POST.type.choices)
      });
    } catch (err) {""}
  }, []);

  const {
    name,
    type,
    description,
    image,
    date_of_birth,
  } = petData;

  const imageInput = useRef(null);
  const history = useHistory();

  // getting todays date to set as min value for date of birth
  const today = new Date().toISOString().split("T")[0]

  const handleChange = (event) => {
    setPetData({
      ...petData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImg = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image)
      setPetData({
        ...petData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();  
    formData.append('name', name);
    formData.append('type', type);
    formData.append('description', description);
    formData.append('date_of_birth', date_of_birth);

    //Only append if there is an image, no default image set in API... yet..
    if (image.length) {
      formData.append('image', imageInput.current.files[0])
    }
    
    try {
      const { data } = await axiosReq.post('pets/', formData);
      history.push(`/pets/${data.id}`);
    } 
    catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };


  const imageInputField = (
    <div className={`text-center`}>
      {image ? (
        <>
          <figure>
            <Image className={styles.PetImg} src={image} rounded/>
          </figure>
          {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          <div>
            <Form.Label
              className={` ${btnStyles.Button}  btn`}
              htmlFor="image-upload"
              >
                Change the image
            </Form.Label>
          </div>
        </>
      ) : (
        <Form.Label
          className={`d-flex justify-content-center`}
          htmlFor="image-upload"
        >
          <Asset
            src={UploadImg}
            message={"Click to upload an image"}
          />
        </Form.Label>)}
        <Form.File
          id='image-upload'
          accept='image/*'
          className='d-none'
          onChange={handleChangeImg}
          ref={imageInput}
        />
      </div>
  );

  return (
    <Form
      onSubmit={handleSubmit}
      className='p-sm-5 mt-3 card shadow'
    >
      <Row className='justify-content-center'>
        <h1 className={`${appStyles.Text}`}>New Pet<hr /></h1>
      </Row>
      
      <Container>
        <Row>
          <Col lg={6} className={`container ${styles.PetImg}`}>
            {imageInputField}
          </Col>
          <Col lg={6} >
            <Container className='pt-4'>

              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  name='name'
                  value={name}
                  onChange={handleChange}
                />
                {errors?.name?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
              </Form.Group>
          
              <Form.Group className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Control
                  as="select"
                  name="type"
                  value={type}
                  onChange={handleChange}
                >
                  <option>Choose...</option>
                  {options?.map((choice, index) => {
                    return (
                      <option value={choice.value} key={index}>{choice.display_name}</option>
                    )
                  })}
                </Form.Control>
                {errors?.type?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
              </Form.Group>

              <Form.Group>
                <Form.Label>Date of birth</Form.Label>
                <Form.Control
                  type='date'
                  name='date_of_birth'
                  value={date_of_birth}
                  onChange={handleChange}
                  max={today}
                />
                {errors?.date_of_birth?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
              </Form.Group>

              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={5}
                  name='description'
                  value={description}
                  onChange={handleChange}  
                />
                {errors?.description?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
              </Form.Group>

            </Container>
          </Col>
        </Row>

        <Row className={`float-right w-100 justify-content-end mb-2`}>
          <Button
            className={` ${btnStyles.CloseBtn}`}
            onClick={() => history.goBack()}
          >
            Cancel
          </Button>
          <Button className={`mr-4 ${btnStyles.Button}`} type='submit'>
            Submit            
          </Button>
        </Row>
      </Container>
      {errors?.detail && (
        <Alert variant='warning' className="text-center">You already have a pet called {name} born on that date,
        if you have two pets with the same name born on the same date,
        please name one {name}1 or something similar to tell them apart</Alert>)}
    </Form>
  );
}

export default PetCreateForm;