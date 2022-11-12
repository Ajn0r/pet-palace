import React, { useEffect, useState } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import Asset from '../../components/Asset';
import noResult from '../../assets/noresults.png'

import styles from '../../styles/Profile.module.css';
import appStyles from '../../App.module.css';
import btnStyles from '../../styles/Button.module.css';

import PopularProfiles from './PopularProfiles';
import Post from '../posts/Post'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Link, useParams } from 'react-router-dom';
import { useProfileData, useSetProfileData } from '../../contexts/ProfileDataContext';
import { axiosReq } from '../../api/axiosDefaults';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMoreData } from '../../utils/utils';
import { ProfileEditDropdown } from '../../components/DropDownManage';

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const {
    setProfileData,
    handleFollow,
    handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;
  const [profilePosts, setProfilePosts] = useState({ results: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ {data: pageProfile}, {data: profilePosts} ] = await Promise.all([
          axiosReq.get(`/profiles/${id}`),
          axiosReq.get(`/posts/?owner__profile=${id}`)
        ]);
        setProfileData(prevState => ({
          ...prevState,
          pageProfile: { results: [pageProfile]}
        }));
        setProfilePosts(profilePosts);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [id, setProfileData])

  const mainProfile = (
    <>
      {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image
            className={`${styles.ProfileImage} shadow`}
            src={profile?.image}
            roundedCircle
          />
        </Col>

        <Col lg={6}>
          <h3 className={`m-2 ml-2 ${appStyles.Text}`}>{profile?.owner}
          {/* if user is of type petowner 
            display a paw with link to pets page */}
          {profile?.type === 1 ? (
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

          <Row className='justify-content-center no-gutters'>
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
          </Row>
        </Col>

        <Col lg={3} className="mt-3 text-lg-right">
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
              <Button
                className={`${btnStyles.Button}`}
                onClick={() => handleUnfollow(profile)}
              >
                unfollow
              </Button>
            ) : (
              <Button
                className={`${btnStyles.Button}`}
                onClick={() => handleFollow(profile)}
              >
                follow
              </Button>
            )
          )}
          {currentUser && !is_owner ? (
            <OverlayTrigger placement='right' overlay={<Tooltip >Send Message</Tooltip>}>
              <Link to={'/message/new'}>
                <i className={`fas fa-paper-plane ml-2`}></i>
              </Link>
            </OverlayTrigger>
          ): (
            null
          )}

        </Col>

        { profile?.description && (
          <Col className="p-3">
            <h4>About me:</h4>
            {profile?.description}
            <hr />
          </Col>
        )}
      </Row>
    </>
  );

  const mainProfilePosts = (
    <>
      <h4 className={`mx-auto mt-4 ${appStyles.SmallerText}`} >{profile?.owner}'s posts</h4>
      <hr className='mx-auto'/>
      {profilePosts?.results.length ? (
        <InfiniteScroll 
          children={profilePosts.results.map((post) => (
            <Post key={post.id} {...post} setPosts={setProfilePosts} />
          ))}
          dataLength={profilePosts.results.length}
          loader={<Asset spinner />}
          hasMore={!!profilePosts.next}
          next={() => fetchMoreData(profilePosts, setProfilePosts)}
            />
            
      ) : (
        is_owner ? (
          <div className='mx-auto text-center'>
            <p>You havn't made any posts yet {profile?.owner}, add one now!</p>
            <Link
              to='/posts/create'
              className={`btn ${btnStyles.Button}`}
            >
              New post
            </Link>
          </div>
        ) : (
          <Asset
          src={noResult}
          message={`${profile?.owner} hasn't made any posts yet`}/>
        )
      )}
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