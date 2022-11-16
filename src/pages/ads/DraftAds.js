import React, { useEffect, useState } from "react";


import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { axiosReq } from "../../api/axiosDefaults";

import appStyles from "../../App.module.css"
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Asset from "../../components/Asset";
import { Link } from "react-router-dom";

const DraftAds = ({mobile}) => {
  const currentUser = useCurrentUser();
  const [ draftData, setDraftData ] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/ads/?status=0&owner=${currentUser.pk}`)
        setDraftData(data);
      } catch (err) {
          console.log(err);
      }
    };
    handleMount();
  }, [currentUser]);
  console.log(draftData)
  console.log(currentUser);
  return (
    <Container className={`card p-3 mt-4 ${mobile && 'd-lg-none text-center mb-3'}`}>
      {draftData.results.length ? (
        <>
          <i className="fas fa-pen text-center"><span className={`ml-2 ${appStyles.SpanText}`}>Your drafts</span></i>
          <hr className="mx-auto" />
          {mobile ? (
            <div className='d-flex justify-content-around'>
              {draftData.results.slice(0, 4).map((ad) => (
                <Link
                to={`/ads/${ad.id}`}
                key={ad.id}
                >
                  <span>Title: {ad.title}</span>
                </Link>
              ))}
            </div>
          ) : (
            draftData?.results.map((ad) => (
                <Row className="pl-3 mb-1" key={ad.id}>
                  <Link
                    to={`/ads/${ad.id}`}
                    >
                      <span>Title: {ad.title}</span>
                    </Link>
                </Row>
            ))
            )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  )
}

export default DraftAds;