import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import noResult from "../../assets/noresults.png";
import styles from "../../styles/Search.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import Pet from "./Pet";
import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";

function PetsPage({ message, filter = "" }) {
  const [pets, setPets] = useState({ results: [] })
  const [ hasLoaded, setHasLoaded ] = useState(false);
  const { pathname } = useLocation();
  const [ query, setQuery ] = useState("");

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const { data } = await axiosReq.get(`/pets/?${filter}&search=${query}`);
        setPets(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchPets();
    }, 1000)
    return () => {
      clearTimeout(timer)
    };
  }, [filter, query, pathname]);

  console.log(pets)
  return (
    <Row className="h-100">
      <Col lg={8} >
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
              <Asset message={message} src={noResult} />
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

export default PetsPage;