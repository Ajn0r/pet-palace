import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import noResult from "../../assets/noresults.png";
import btnStyles from "../../styles/Button.module.css";
import filterStyles from "../../styles/Filter.module.css";
import searchStyles from "../../styles/Search.module.css";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Ad from "./Ad";
import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import DraftAds from "./DraftAds";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function PostsPage() {
  const [ ads, setAds  ] = useState({results: []});
  const [ pets, setPets ] = useState({results: []});
  const [ hasLoaded, setHasLoaded ] = useState(false);
  const { pathname } = useLocation();
  const [ query, setQuery ] = useState("");
  const [ filter, setFilter ] = useState("");
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const [{ data: ads }, { data: pets }] = await Promise.all([
          axiosReq.get(`/ads/?${filter}&search=${query}`),
          axiosReq.get('/ads/petchoices')
        ]);
        setAds(ads);
        setPets(pets);
        setHasLoaded(true);
      } catch (err) {
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchAds();
    }, 1000)
    return () => {
      clearTimeout(timer)
    };
  }, [filter, query, pathname]);

  return (
    <Row className="h-100 p-3 pl-xs-3">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <DraftAds mobile />
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
          >
        <Form.Row
            className={filterStyles.FilterFields}>
          <Form.Control
            as="select"
            onChange={(event) => setFilter(`&pets=${event.target.value}`)}
            value={filter}
            className={filterStyles.FilterBar}
          >
            <option>Filter ads by pet</option>
            {pets?.results?.map((pet => {
              return (
                <option key={pet.id} value={pet.id}>{pet.name}</option>
              )
            })
            )}
          </Form.Control>
          <Form.Control
            as="select"
            onChange={(event) => setFilter(`&type=${event.target.value}`)}
            value={filter}
            className={filterStyles.FilterBar}
          >
            <option>Filter ads by type</option>
            <option value={0}>Pet-sitting</option>
            <option value={1}>Pet-sitter</option>
            <option value={2}>Unspecified</option>
          </Form.Control>
          <Button
            className={btnStyles.Button}
            onClick={() => setFilter('')}>Reset filter</Button>
          </Form.Row>
        </Form>
        {hasLoaded ? (
          <>
            { ads.results.length ? (
              <InfiniteScroll
                children={
                  ads.results.map((ad) => (
                    <Ad key={ad.id} {...ad} setAds={setAds}/>
                  ))}
                dataLength={ads.results.length}
                loader={<Asset spinner />}
                hasMore={!!ads.next}
                next={() => fetchMoreData(ads, setAds)}
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
        {currentUser ? (<DraftAds />) : (null)}
      </Col>
    </Row>
  );
};

export default PostsPage;