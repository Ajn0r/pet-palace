/* eslint-disable */

import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import noResult from "../../assets/noresults.png";
import styles from "../../styles/Search.module.css";
import btnStyles from "../../styles/Button.module.css";
import filterStyles from "../../styles/Filter.module.css";

import { axiosReq } from "../../api/axiosDefaults";
import Pet from "./Pet";
import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import UsersPets from "./UsersPets";
import { useCurrentUser } from "../../contexts/CurrentUserContext";


function PetsPage() {
  const [pets, setPets] = useState({ results: [] });
  const [ hasLoaded, setHasLoaded ] = useState(false);
  const { pathname } = useLocation();
  const [ query, setQuery ] = useState("");
  const [ options, setOptions ] = useState([]);
  const [ filter, setFilter ] = useState("");

  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || '';

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const { data } = await axiosReq.get(`/pets/?${filter}&search=${query}`);
        setPets(data);
        setHasLoaded(true);
      } catch (err) {""}
    };
    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchPets();
    }, 1000)
    return () => {
      clearTimeout(timer)
    };
  }, [filter, query, pathname]);

  useEffect(() => {
    try {
      axiosReq.options('/pets/').then((response) => {
        setOptions(response.data.actions.POST.type.choices)
      });
    } catch (err) {""}
  }, []);

  return (
    <Row className="h-100">
      <Col lg={8} >
        <UsersPets mobile />
        <i className={`fas fa-search ${styles.SearchIcon}`}/>
        <Form className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}>
          <Form.Control
            type="text"
            placeholder="Search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </Form>

        <Form
          onSubmit={(event) => event.preventDefault()}
          >
        <Form.Row
            className={filterStyles.FilterFields}>
          <Form.Control
            as="select"
            onChange={(event) => setFilter(`&type=${event.target.value}`)}
            value={filter}
            className={filterStyles.FilterBar}
          >
            <option>Filter pets by type</option>
            {options?.map((pet, index) => {
              return (
                <option key={index} value={pet.value}>{pet.display_name}</option>
              )
            })
            }
          </Form.Control>
          {currentUser && <Button
            className={`mb-3 ${btnStyles.Button}`}
            onClick={() => setFilter(`&owner=${profile_id}`)}
            >My pets</Button>}
          <Button
            className={`mb-3 ${btnStyles.Button}`}
            onClick={() => setFilter('')}>Reset filter</Button>
          </Form.Row>
        </Form>

        {hasLoaded ? (
          <>
          { pets.results.length ? (
            <InfiniteScroll 
              children={
                pets.results.map((pet) => (
                  <Pet key={pet.id} {...pet} setPets={setPets} />)
                )}
              dataLength={pets.results.length}
              loader={<Asset spinner />}
              hasMore={!!pets.next}
              next={() => fetchMoreData(pets, setPets)}
            />
          ) : (
            <Container>
              <Asset message={'No pets found'} src={noResult} />
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
        <UsersPets />
        <PopularProfiles/>
      </Col>
    </Row>
  );
}

export default PetsPage;