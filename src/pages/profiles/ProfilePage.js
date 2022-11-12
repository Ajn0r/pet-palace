import React, { useEffect, useState } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import Asset from '../../components/Asset';

import styles from '../../styles/Profile.module.css';
import appStyles from '../../App.module.css';
import btnStyles from '../../styles/Button.module.css';

import PopularProfiles from './PopularProfiles';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Link, useParams } from 'react-router-dom';
import { useProfileData, useSetProfileData } from '../../contexts/ProfileDataContext';
import { axiosReq } from '../../api/axiosDefaults';

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const setProfileData = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ {data: pageProfile} ] = await Promise.all([
          axiosReq.get(`/profiles/${id}`)
        ])
        setProfileData(prevState => ({
          ...prevState,
          pageProfile: { results: [pageProfile]}
        }))
        setHasLoaded(true);
      } catch (err) {
        console.log(err)
      }
    }
    fetchData();
  }, [id, setProfileData])

  const mainProfile = (
    <>
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.ProfileImage}
            src={profile?.image}
            roundedCircle
          />
        </Col>

        <Col lg={6}>
          <h3 className={`m-2 ml-2 ${appStyles.Text}`}>{profile?.owner}
          {/* if user is of type petowner 
            display a paw with link to pets page */}
          {profile?.type === 0 ? (
            <Link
              to='/pets/'>
              <i className='fas fa-paw ml-3'></i>
            </Link>
          ) : (
            null
          )}
          </h3>

          {/* Is user has been rated display the rate, else nothing */}
          {profile?.ratings?.length ? (
            <Row>
            <Col xs={12}>
              <i className='far fa-star'> </i>
              (nr of ratings)
            </Col>
          </Row>
          ) : (
            null
          )}

          <Row>
            <Col xs={3} className='my-2'>
              <div>{profile?.nr_of_post}</div>
              <div>posts</div>
            </Col>
            <Col xs={3} className='my-2'>
              <div>{profile?.followers_count}</div>
              <div>followers</div>
            </Col>
            <Col xs={3} className='my-2'>
              <div>{profile?.following_count}</div>
              <div>followings</div>
            </Col>
            <Col xs={3} className='my-2'>
              <div>nr</div>
              <div>? petsittings : pets</div>
            </Col>
          </Row>
        </Col>

        <Col lg={3} className="mt-3 text-lg-right">
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
              <Button
                className={`${btnStyles.Button}`}
                onClick={() => {}}
              >
                unfollow
              </Button>
            ) : (
              <Button
                className={`${btnStyles.Button}`}
                onClick={() => {}}
              >
                follow
              </Button>
            )
          )}
          {currentUser && !is_owner ? (
            <Link to={'/message/new'}>
              <i className={`fas fa-paper-plane ml-2`}></i>
            </Link>
          ): (
            null
          )}

        </Col>

        { profile?.description && (
          <Col className="p-3">Profile description</Col>
        )}
      </Row>
    </>
  );

  const mainProfilePosts = (
    <>
      <hr className='mx-auto'/>
      <p className="text-center">Profile owner's posts</p>
      <hr className='mx-auto' />
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <Container className="card shadow">
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfilePosts}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        {/* If Ratings / ads/  Pets go here */}
        <p className='card p-5'>If ads - the latest then button to more</p>
        <p className='card p-5'>If Ratings - 3 latest then button to more</p>
        <p className='card p-5'>If pets - max 3 then button to more</p>
        <PopularProfiles />
        
      </Col>
    </Row>
  );
}

export default ProfilePage;