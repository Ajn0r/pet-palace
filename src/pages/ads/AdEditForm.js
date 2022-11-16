import React, { useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';

import UploadImg from '../../assets/uploadimage.png';
import styles from '../../styles/Ad.module.css';
import appStyles from '../../App.module.css';
import btnStyles from '../../styles/Button.module.css';

import Asset from '../../components/Asset';
import { axiosReq } from '../../api/axiosDefaults';
import { useRedirect } from '../../hooks/useRedirect';

function AdEditForm () {
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
  const { id } = useParams();

  // Variables to controll if the user can update the dates
  const date = new Date().toISOString();
  const passed_from = (date_from <= date);
  const passed_to = (date_to <= date);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/ads/${id}`)
        const {
          title,
          description,
          image,
          pets,
          date_from,
          date_to,
          compensation,
          location,
          status,
          type,
          is_owner, } = data;

        is_owner ? setAdData(
          {title, description, image, pets, date_from,
          date_to, compensation, location, status, type }
        ) : history.push('/');
      } catch (err) {
          console.log(err);
      }
    };
    handleMount();
  }, [history, id]);

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
    if (pets?.length) {
      pets.forEach((pet) => formData.append('pets', pet))}


    //Only append if there is an image, no default image set in API... yet..
    if (image?.length) {
      formData.append('image', imageInput.current.files[0])
    }
    
    try {
      await axiosReq.patch(`ads/${id}`, formData);
      history.push(`/ads/${id}`);
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
            <Image className={`${appStyles.Image}`} src={image} rounded/>
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
      <h1 className={`pt-2 text-center ${appStyles.Text}`}>Edit ad<hr /></h1>
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
              disabled={passed_from}
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
              disabled={passed_to}
            />
            {errors?.date_to?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Form.Group>
        </Form.Row>
        <div className={`float-lg-left mr-3 ${styles.AdImg} ${styles.AdImageWidth}`}>
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

          <Form.Group as={Col} xl='6'>
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

          <Form.Group as={Col} xl='6'>
            <Form.Label>Type of ad</Form.Label>
            <Form.Control               
              as="select"
              name='type'
              value={type}
              onChange={handleChange}
            >
              <option value={0} key={0}>I need a Petsitting</option>
              <option value={1} key={1}>I want to Petsit</option>
              <option value={2} key={2}>Unspecified</option>
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
                <option value={0} key={0}>Draft</option>
                <option value={1} key={1}>Active</option>
            </Form.Control>
            {errors?.status?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Form.Group>
        </Form.Row>
        <Form.Row className={`float-right ${styles.EditBtn}`}>
          <Button
            className={`mx-auto  mr-2 ${btnStyles.Button}`}
            onClick={() => history.goBack()}
          >
            Cancel
          </Button>
          <Button className={`mx-auto ml-4 ${btnStyles.Button}`} type='submit'>
            Submit            
          </Button>

        </Form.Row>

      </Form>
    </div>
  )
}

export default AdEditForm;