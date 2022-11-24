import React, { useEffect, useState } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import Asset from '../../components/Asset';
import noResult from '../../assets/noresults.png'

import styles from '../../styles/Profile.module.css';
import appStyles from '../../App.module.css';
import btnStyles from '../../styles/Button.module.css';

import PopularProfiles from './PopularProfiles';
import Post from '../posts/Post';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Link, useParams } from 'react-router-dom';
import { useProfileData, useSetProfileData } from '../../contexts/ProfileDataContext';
import { axiosReq } from '../../api/axiosDefaults';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMoreData } from '../../utils/utils';
import { ProfileEditDropdown } from '../../components/DropDownManage';
import Avatar from '../../components/Avatar';

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
  const [profilePets, setProfilePets] = useState({ results: []});
  const [profileAds, setProfileAds] = useState({results: []});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          {data: pageProfile},
          {data: profilePosts},
          {data: profilePets},
          {data: profileAds}
        
        ] = await Promise.all([
          axiosReq.get(`/profiles/${id}`),
          axiosReq.get(`/posts/?owner__profile=${id}`),
          axiosReq.get(`pets/?owner=${id}`),
          axiosReq.get(`ads/?owner=${id}&status=1`),
        ]);
        setProfileData(prevState => ({
          ...prevState,
          pageProfile: { results: [pageProfile]}
        }));
        setProfilePosts(profilePosts);
        setProfilePets(profilePets);
        setProfileAds(profileAds);

        setHasLoaded(true);
      } catch (err) {
      }
    }
    fetchData();
  }, [id, setProfileData])

  // getting todays date 
  const today = new Date().toISOString().split("T")[0]


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

        <Col lg={7}>
          <h3 className={`m-2 ml-2 ${appStyles.Text}`}>{profile?.owner}
          {/*if the user is a petowner a paw will be displayed*/}
          {profile?.type === 1 ? (
            <i className='fas fa-paw ml-3'></i>
          ) : (
            null
          )}
          </h3>

          <Row className='justify-content-center no-gutters'>
            <Col xs={4} sm={3} className='my-2'>
              <div>{profile?.nr_of_post}</div>
              <div>posts</div>
            </Col>
            <Col xs={4} sm={3} className='my-2'>
              <div>{profile?.followers_count}</div>
              <div>followers</div>
            </Col>
            <Col xs={4} sm={3} className='my-2'>
              <div>{profile?.following_count}</div>
              <div>followings</div>
            </Col>
          </Row>
        </Col>

        <Col lg={2} className="mt-3 text-lg-right">
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
          <div className='mx-auto text-center pb-4'>
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
          message={`${profile?.owner} hasn't created any posts yet`}/>
        )
      )}
    </>
  );

  const profilePet = (
    profilePets?.results.map((pet) => (
      <Row className="pl-3 pb-2 mb-3 align-items-center" key={pet.id}>
        <Link
          to={`/pets/${pet.id}`}
        >
          <Avatar src={pet.image} />
          <span className='pl-2'>{pet.name}</span>
        </Link>
      </Row>
    ))
  );

  const profileAd = (
    profileAds?.results.map((ad) => (
      //Only display ads that hasn't passed their end date
      ad.date_to > today && (
        <Row className="pl-3 pb-2 mb-3 align-items-center" key={ad.id}>
          <Link
            to={`/ads/${ad.id}`}
          >
            <span className='pl-2'>{ad.title}</span>
          </Link>
        </Row>
      )
    ))
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <Container className="card shadow p-3">
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
        {hasLoaded  ? (
          profilePets?.results.length ?  (
            <div className='card mb-3 p-3'>
              <p className={`${appStyles.SpanText}`}>{profile?.owner}'s pets</p>
              {profilePet}
            </div>
          ) : (null)
        ) : (
          <div className='card mb-3 p-3'><Asset spinner /></div>
        )}
        {hasLoaded ? (
          //Filter out to only count the ads with end date that hasn't passed
          profileAds?.results.filter((ad) => ad.date_to > today).length ? (
            <div className='card mb-3 p-3'>
              <p className={`${appStyles.SpanText}`}>{profile?.owner}'s ads</p>
                {profileAd}
            </div>
          ) : (null)
        ) : (
          <div className='card mb-3 p-3'><Asset spinner /></div>
        ) }
        <PopularProfiles />
      </Col>
    </Row>
  );
};

export default ProfilePage;