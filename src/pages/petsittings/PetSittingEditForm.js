import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import appStyles from '../../App.module.css';
import btnStyles from '../../styles/Button.module.css';

import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";
import Asset from "../../components/Asset";

function PetSittingEditForm() {
	useRedirect('loggedOut');
  const [ errors, setErrors ] = useState({});
  const [ pet, setPet ] = useState({ results: []});
  const [ petSitter, setPetSitter ] = useState([]);
  const [ hasLoaded, setHasLoaded ] = useState(false);
  
  const currentUser = useCurrentUser();

  const [ petSittingData, setPetSittingData ] = useState({
    petsitter: '',
    pets: [],
    description: '',
    compensation: '',
    date_from: '',
    date_to: '',
    location: '',
    status: '',
  });

  //fetching options to choose from
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ {data: pet}, {data: petSitter} ] = await Promise.all([
          axiosReq.get(`/pets/?owner=${currentUser.pk}`),
          axiosReq.get(`/profiles`),
        ]);
        setPet(pet);
        setPetSitter(petSitter);
        setHasLoaded(true);
      } catch (err) {""}
    };
    setHasLoaded(false);
    fetchData();
  }, [currentUser]);

  const {   
    petsitter,  
    pets,
    description,
    date_from,
    date_to,
    compensation,
    location,
    status,
  } = petSittingData;

  const history = useHistory();
	const { id } = useParams();

	useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/petsittings/${id}`)
        const {
          petsitter,
          pets,
					description,
          date_from,
          date_to,
          compensation,
          location,
          status,
          is_owner, } = data;
        is_owner ? setPetSittingData(
          {petsitter, description, date_from,
          date_to, compensation, location, status, pets: pets.map(
						(pet) => { return pet})}
        ) : history.push('/');
      } catch (err) {""}
    };
    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setPetSittingData({
      ...petSittingData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangePets = (event) => {
    setPetSittingData({
      ...petSittingData,
      pets: Array.from(event.target.selectedOptions, (pets) => pets.value)
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('petsitter', petsitter);
    formData.append('description', description);
    formData.append('date_from', date_from);
    formData.append('date_to', date_to);
    formData.append('compensation', compensation);
    formData.append('location', location);
    formData.append('status', status);

    // Append all objects in the array of pets
    if (pets?.length) {
      pets.forEach((pet) => formData.append('pets', pet))}
    
    try {
      const { data } = await axiosReq.patch(`petsittings/${id}`, formData);
      history.push(`/petsittings/${data.id}`);
    } 
    catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <div className='p-5 card shadow'>
      <h1 className={`pt-2 text-center ${appStyles.Text}`}>New petsitting<hr /></h1>
      
      <Form
        onSubmit={handleSubmit}
        className=''>
        <Form.Row>
          <Form.Group as={Col} md='12'>
            <Form.Label>Petsitter</Form.Label>
            <Form.Control
              as="select"
              name='petsitter'
              value={petsitter}
              onChange={handleChange}
            >
              <option>Choose a petsitter...</option>
              {petSitter?.results?.map((petsitter) => {
                return (
              <option value={petsitter.id} key={petsitter.id}>
                {petsitter.owner}
              </option>
              )}
              )}
            </Form.Control>
            {errors?.petsitter?.map((message, idx) => (
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
              min={date_from}
            />
            {errors?.date_to?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Form.Group>
        </Form.Row>

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

          <Form.Group as={Col} md='12'>
            <Form.Label>Pets</Form.Label>
            {hasLoaded ? (
              <>
               {pet?.results?.length ? (
                <Form.Control
                  as="select"
                  name='pets'
                  value={pets}
                  onChange={handleChangePets}
                  multiple={true}
                >
                    {pet?.results.map((pets) => {
                      return (
                        <option value={pets.id} key={pets.id}>
                          {pets.name}
                        </option>
                      )}
                    )}
                  </Form.Control>
               ) : (
                <div className="d-flex text-center pt-4 pb-4 justify-content-center flex-column">
                  <p
                    className="mb-1">You dont have any pets to choose from</p>
                  <Link
                    to="/pets/create"
                    className={`mx-auto ${appStyles.SpanText}`}
                    >Create new pet</Link>
                </div>
               )
               }
                </>
                
              ) : (
                  <Asset spinner />
              )}
              
            
              {errors?.pet?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Form.Group>
 
          <Form.Group as={Col} md='12'>
            <Form.Label>Status</Form.Label>
            <Form.Control               
                as="select"
                name='status'
                value={status}
                onChange={handleChange}>
                  <option>Choose...</option>
                  <option value={0} key={0}>Planned</option>
                  <option value={1} key={1}>Ongoing</option>
                  <option value={2} key={2}>Finished</option>
              </Form.Control>
              {errors?.status?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
          </Form.Group>
        </Form.Row>
        <Form.Row className={`float-right ${btnStyles.FormBtn}`}>
          <Button
            className={`mx-auto  mr-2 ${btnStyles.CloseBtn}`}
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
  );
}

export default PetSittingEditForm;