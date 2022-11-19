import React, { useEffect, useState } from "react";

import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { axiosReq, axiosRes } from "../../api/axiosDefaults";

import styles from "../../styles/Ad.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css"
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Asset from "../../components/Asset";
import { Link } from "react-router-dom";

const DraftAds = ({mobile}) => {
  const currentUser = useCurrentUser();
  const [ draftData, setDraftData ] = useState({ results: [] });
  const [ deleted, setDeleted ] = useState(false);

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
    setDeleted(false);
  }, [currentUser, deleted]);


  function DeleteModal({id}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = async () => {
      try {
        await axiosRes.delete(`/ads/${id}`);
        setDeleted(true);
      } catch (err) {
        console.log(err);
      }
    };
  
    return (
      <>
        <i className={`${styles.DraftTrash} far fa-trash-alt ml-auto pr-2`} onClick={handleShow}></i>
  
        <Modal show={show} centered onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete draft</Modal.Title>
          </Modal.Header>
          <Modal.Body>This will delete the Draft</Modal.Body>
          <Modal.Footer>
            <Button
              className={btnStyles.CloseBtn}
              onClick={handleClose}
            >
              Close
            </Button>
            <Button 
              className={btnStyles.Button}
              onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  return (
    currentUser && draftData.results.length ? (
    <Container className={`card p-3 mt-4 ${mobile && 'd-lg-none text-center mb-3'} ${!mobile && styles.Sticky}`}>
      {draftData.results.length ? (
        <>
          <i className="fas fa-pen text-center"><span className={`ml-2 ${appStyles.SpanText}`}>Your drafts</span></i>
          <hr className="mx-auto" />
          {mobile ? (
            <div className={`${styles.DraftsMobile}`}>
              {draftData.results.slice(0, 4).map((ad) => (
                <Link
                to={`/ads/${ad.id}`}
                key={ad.id}
                >
                  <span className={`${appStyles.SpanText}`}>Title: </span>{ad.title}
                </Link>
              ))}
            </div>
          ) : (
            draftData?.results.map((ad) => (
              <Row className="pl-3 mb-3 align-items-center" key={ad.id}>
                <Link
                  to={`/ads/${ad.id}`}
                  >
                    <span className={`${appStyles.SpanText}`}>Title: </span>{ad.title}
                </Link>
                <DeleteModal id={ad.id}/>
              </Row>

            ))
            )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>) : (null)
  )
}

export default DraftAds;