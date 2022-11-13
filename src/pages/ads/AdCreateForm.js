import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { axiosReq } from '../../api/axiosDefaults';
import { useRedirect } from '../../hooks/useRedirect';

function AdCreateForm () {
  // useRedirect('loggedOut');
  
  const [ errors, setErrors ] = useState({});
  const [ options, setOptions ] = useState({
    pets: [],
    status: [],
    type: [],
  });
  const [ adData, setAdData ] = useState({
    pets: '',
    type: options.type,
    title: '',
    description: '',
    image: '',
    date_from: '',
    date_to: '',
    compensation: '',
    location: '',
    status: options.status,
  });

  // Fetching all form choices from the API
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        await axiosReq.options('/ads').then((response) => {
          setOptions(
            {pets: response.data.actions.POST.pets.choices},
            {status: response.data.actions.POST.status.choices},
            {type: response.data.actions.POST.type.choices},
          );
        }) 
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

  const petOptions = Array.from(options.pets);
  console.log(petOptions);

  const imageInput = useRef(null);
  const history = useHistory();

  const handleChange = (event) => {
    setAdData({
      ...adData,
      [event.target.name]: event.target.value,
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

    formData.append('pets', pets);
    formData.append('type', type);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', imageInput.current.files[0]);
    formData.append('date_from', date_from);
    formData.append('date_to', date_to);
    formData.append('compensation', compensation);
    formData.append('location', location);
    formData.append('status', status);
    
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

  return (
    <Form>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter title" />
        </Form.Group>
    
        <Form.Group as={Col}>
          <Form.Label>Location</Form.Label>
          <Form.Control type="adress" placeholder="Location" />
        </Form.Group>
      </Form.Row>
    
      <Form.Group>
        <Form.Label>Address</Form.Label>
        <Form.Control placeholder="1234 Main St" />
      </Form.Group>
    
      <Form.Group>
        <Form.Label>Address 2</Form.Label>
        <Form.Control placeholder="Apartment, studio, or floor" />
      </Form.Group>
    
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>City</Form.Label>
          <Form.Control />
        </Form.Group>
    
        <Form.Group as={Col}>
          <Form.Label>Pets</Form.Label>
          <Form.Control
            as="select"
            name='pets'
            value={pets}
            onChange={handleChange}
          >
            {options?.pets.map((petChoice, index ) => {
              return (
             <option value={petChoice.value} key={index}>{petChoice.display_name}</option>
            )}
            )}
          </Form.Control>
        </Form.Group>
    
        <Form.Group as={Col}>
          <Form.Label>Zip</Form.Label>
          <Form.Control />
        </Form.Group>
      </Form.Row>
    
      <Form.Group>
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
    
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default AdCreateForm;