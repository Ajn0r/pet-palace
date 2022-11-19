import React, { useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';

import UploadImg from '../../assets/uploadimage.png';
import styles from '../../styles/Pet.module.css';
import appStyles from '../../App.module.css';
import btnStyles from '../../styles/Button.module.css';

import Asset from '../../components/Asset';
import { axiosReq } from '../../api/axiosDefaults';
import { useRedirect } from '../../hooks/useRedirect';
import { Container, Row } from 'react-bootstrap';

function PetEditForm () {
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
    } catch (err) {

    }
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
  const { id } = useParams();

  // getting todays date to set as min value for date of birth
  const today = new Date().toISOString().split("T")[0]

  //Getting form data to prepopulate form
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/pets/${id}`)
        console.log('fetched data');
        const {
          name,
          type,
          description,
          image,
          date_of_birth,
          is_owner, } = data;
        is_owner ? setPetData(
          {name, type, description, image, date_of_birth})
        : history.push('/');
      } catch (err) {
          console.log(err);
      }
    };
    handleMount();
  }, [history, id]);

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
    console.log(formData)

    if (imageInput?.current?.files[0]) {
      formData.append('image', imageInput.current.files[0]);
    }
 
    try {
      const { data } = await axiosReq.patch(`pets/${id}`, formData);
      history.push(`/pets/${data.id}`);
    } 
    catch (err) {
      console.log(err)
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
            <Image className={appStyles.Image} src={image} rounded/>
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
    <Form
      onSubmit={handleSubmit}
      className='p-5 mt-3 card shadow'
    >
      <Row className='justify-content-center'>
        <h1 className={`${appStyles.Text}`}>New Pet<hr /></h1>
      </Row>
      
      <Container>
        <Row>
          <Col lg={6} className={`container ${appStyles.Image}`}>
            {imageInputField}
          </Col>
          <Col lg={6} >
            <Container className='pt-5'>

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

        <Row className={`float-right w-100 justify-content-end`}>
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
    </Form>
  )
}

export default PetEditForm;