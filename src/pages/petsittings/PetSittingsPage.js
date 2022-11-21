import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import noResult from "../../assets/noresults.png";
import styles from "../../styles/Petsitting.module.css";
import btnStyles from "../../styles/Button.module.css";
import filterStyles from "../../styles/Filter.module.css";
import searchStyles from "../../styles/Search.module.css";
import { Link, useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Avatar from "../../components/Avatar";

function PetSittingsPage() {
	const [ petsittings, setPetsittings ] = useState({ results: [] });
	const [ pets, setPets ] = useState({ results: []});
	const [ hasLoaded, setHasLoaded ] = useState(false);
  const { pathname } = useLocation();
  const [ query, setQuery ] = useState("");
  const [ filter, setFilter ] = useState("");
  const currentUser = useCurrentUser();
	
	useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: petsittings }, { data: pets }] = await Promise.all([
          axiosReq.get(`/petsittings/?${filter}&search=${query}`),
          axiosReq.get(`/pets/?owner=${currentUser.pk}`)
        ]);
        setPetsittings(petsittings);
        setPets(pets);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
		setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchData();
    }, 1000)
    return () => {
      clearTimeout(timer)
    };
  }, [filter, query, pathname, currentUser]);
	
  return (
    <Row className="h-100 pl-sm-3">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <i className={`fas fa-search ${searchStyles.SearchIcon}`}/>
        <Form className={searchStyles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            type="text"
            placeholder="Search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </Form>
        <Form
          onSubmit={(event) => event.preventDefault()}
					className="mb-3"
        >
          <Form.Row
              className={filterStyles.FilterFields}>
            <Form.Control
              as="select"
              onChange={(event) => setFilter(`&pets=${event.target.value}`)}
              value={filter}
              className={filterStyles.FilterBar}
            >
              <option>Filter by pet</option>
              {pets?.results?.map((pet => {
                return (
                  <option key={pet.id} value={pet.id}>{pet.name}</option>
                )
              })
              )}
            </Form.Control>
            <Form.Control
              as="select"
              onChange={(event) => setFilter(`&status=${event.target.value}`)}
              value={filter}
              className={filterStyles.FilterBar}
            >
              <option>Filter by status</option>
              <option value={0}>Planned</option>
              <option value={1}>On-going</option>
              <option value={2}>Finished</option>
            </Form.Control>
            <Form.Control
              as="select"
              onChange={(event) => setFilter(`${event.target.value}`)}
              value={filter}
              className={filterStyles.FilterBar}
            >
              <option>Filter by role</option>
              <option value={`owner=${currentUser?.pk}`}>Where I am owner</option>
              <option value={`petsitter=${currentUser?.pk}`}>Where I am petsitter</option>
            </Form.Control>
            <Button
              className={btnStyles.Button}
              onClick={() => setFilter('')}>Reset filter
            </Button>
          </Form.Row>
        </Form>
        {hasLoaded ? (
          <>
            { petsittings?.results.length ? (
              <InfiniteScroll
                children={
                  petsittings?.results.map((petsitting) => (
										<div 
											key={petsitting.id}
											className="card container p-3 mb-3"
										>
										<Link to={`/petsittings/${petsitting.id}`}
											className={styles.Link}>

											<div className="row m-2">
												<div className="col-md-3 d-flex flex-column text-center">
												<Avatar src={petsitting.profile_image} height={55}/>
												<span>Owner: {petsitting.owner}</span>
												</div>

												<div className="col-md-6 text-center">
													<h4 className="">Petsitting: {petsitting.id}</h4>
													<p>Dates: {petsitting.date_from} - {petsitting.date_to}</p>
													<p>Location: {petsitting.location}</p>
												</div>

												<div className="col-md-3 d-flex flex-column text-center">
												<Avatar src={petsitting.petsitter_profile_image} height={55}/>
												<span>Petsitter: {petsitting.petsitter_username}</span>
												</div>
											</div>
											</Link>
									</div>
                  ))}
                dataLength={petsittings.results.length}
                loader={<Asset spinner />}
                hasMore={!!petsittings.next}
                next={() => fetchMoreData(petsittings, setPetsittings)}
              />
            ) : (
              <Container>
                <Asset message={'No results found'} src={noResult} />
              </Container>
            )}
          </>
        ) : (
          <Container>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles/>
      </Col>
    </Row>
  )
}

export default PetSittingsPage