import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';

import UploadImg from '../../assets/uploadimage.png';
import styles from '../../App.module.css';
import btnStyles from '../../styles/Button.module.css';

import Asset from '../../components/Asset';
import { axiosReq } from '../../api/axiosDefaults';
import { useRedirect } from '../../hooks/useRedirect';

function AdCreateForm () {
  useRedirect('loggedOut');
  const [ errors, setErrors ] = useState({});
  const [ options, setOptions ] = useState({
    results: [] });

  const [ adData, setAdData ] = useState({
    pets: '',
    type: '',
    title: '',
    description: '',
    image: '',
    date_from: '',
    date_to: '',
    compensation: '',
    location: '',
    status: '',
  });

  // Fetching all form choices from the API
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const { data } = await axiosReq.get('/ads/petchoices');
        setOptions(data);
      } catch (err) {
        console.log(err)
      }
    }
    fetchOptions();
  }, []);

  const {     
    pets,
    type,
    title,
    description,
    image,
    date_from,
    date_to,
    compensation,
    location,
    status,
  } = adData;

  const imageInput = useRef(null);
  const history = useHistory();

  const handleChange = (event) => {
    setAdData({
      ...adData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangePets = (event) => {
    setAdData({
      ...adData,
      pets: Array.from(event.target.selectedOptions, (pets) => pets.value)
    });
  };

  const handleChangeImg = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image)
      setAdData({
        ...adData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();  

    formData.append('type', type);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('date_from', date_from);
    formData.append('date_to', date_to);
    formData.append('compensation', compensation);
    formData.append('location', location);
    formData.append('status', status);

    // Append all objects in the array of pets
    pets.forEach((pet) => formData.append('pets', pet))

    //Only append if there is an image, no default image set in API... yet..
    if (image.length) {
      formData.append('image', imageInput.current.files[0])
    }
    
    try {
      const { data } = await axiosReq.post('ads/', formData);
      history.push(`/ads/${data.id}`);
    } 
    catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const imageInputField = (
    <div>
      {image ? (
        <>
          <figure>
            <Image className={styles.Image} src={image} rounded/>
          </figure>
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
  )

  return (
    <div className='p-5 card shadow'>
      <h1 className={`pt-2 text-center ${styles.Text}`}>New ad<hr /></h1>
      
      <Form
        onSubmit={handleSubmit}
        className=''>
        <Form.Row>
          <Form.Group as={Col} md='12'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              name='title'
              value={title}
              onChange={handleChange}
            />
            {errors?.title?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Form.Group>
      
          <Form.Group as={Col} md='6'>
            <Form.Label>Location</Form.Label>
            <Form.Control
              type='text'
              name='location'
              value={location}
              onChange={handleChange}
            />
            {errors?.location?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Form.Group>

          <Form.Group as={Col} md='3'>
            <Form.Label>Start date</Form.Label>
            <Form.Control
              type='date' 
              name='date_from'
              value={date_from}
              onChange={handleChange}
            />
            {errors?.date_from?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Form.Group>
          
          <Form.Group as={Col} md='3'>
            <Form.Label>End date</Form.Label>
            <Form.Control
              type='date' 
              name='date_to'
              value={date_to}
              onChange={handleChange}
            />
            {errors?.date_to?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Form.Group>
        </Form.Row>
        <div className='float-lg-left mr-3'>
            {imageInputField}
          </div>
        <Form.Row>
          <Form.Group as={Col} md='12'>
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

          <Form.Group as={Col} lg='6'>
            <Form.Label>Compensation</Form.Label>
            <Form.Control
              type='text'
              name='compensation'
              value={compensation}
              onChange={handleChange}
            />
            {errors?.compensation?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Form.Group>

          <Form.Group as={Col} lg='6'>
            <Form.Label>Type of ad</Form.Label>
            <Form.Control               
              as="select"
              name='type'
              value={type}
              onChange={handleChange}
            >
              <option value={0}>I need a Petsitting</option>
              <option value={1}>I want to Petsit</option>
              <option value={2}>Unspecified</option>
            </Form.Control>
            {errors?.type?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Form.Group>
      
          <Form.Group as={Col} md='12'>
            <Form.Label>Pets</Form.Label>
            <Form.Control
              as="select"
              name='pets'
              value={pets}
              onChange={handleChangePets}
              multiple={true}
            >
              {options?.results?.map((pets) => {
                return (
              <option value={pets.id} key={pets.id}>
                {pets.name}
              </option>
              )}
              )}
            </Form.Control>
              {errors?.pets?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Form.Group>
 
          <Form.Group as={Col} md='12'>
          <Form.Control               
              as="select"
              name='status'
              value={status}
              onChange={handleChange}>
                <option value={0}>Draft</option>
                <option value={1}>Active</option>
            </Form.Control>
            {errors?.status?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Button className={`mx-auto mr-lg-3 f ${btnStyles.Button}`} type='submit'>
            Submit
          </Button>
        </Form.Row>
      </Form>
    </div>
  )
}

export default AdCreateForm;