import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import noResult from '../../assets/noresults.png'
import styles from "../../styles/Search.module.css";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Ad from './Ad';
import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";

function PostsPage({ message, filter = '' }) {
  const [ ads, setAds  ] = useState({results: []});
  const [ hasLoaded, setHasLoaded ] = useState(false);
  const { pathname } = useLocation();
  const [ query, setQuery ] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/ads/?${filter}&search=${query}`);
        setAds(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000)
    return () => {
      clearTimeout(timer)
    };
  }, [filter, query, pathname]);

  return (
    <Row className="h-100 pl-sm-3">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
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
  );
}

export default PostsPage;