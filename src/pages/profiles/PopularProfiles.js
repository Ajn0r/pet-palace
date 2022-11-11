import React from 'react';

import Container from 'react-bootstrap/Container';

import Asset from '../../components/Asset';
import { useProfileData } from '../../contexts/ProfileDataContext';
import Profile from './Profile';

const PopularProfiles = ({mobile}) => {

  const { popularProfiles } = useProfileData();

  return (
    <Container className={`card p-3 ${mobile && 'd-lg-none text-center mb-3'} `}>
      {popularProfiles.results.length ? (
        <>
          <p>Most followed profiles</p>
          {mobile ? (
            <div className='d-flex justify-content-around'>
              {popularProfiles.results.slice(0, 4).map((profile) => (
                <Profile key={profile.id} profile={profile} mobile />
              ))}
            </div>
          ) : (
            popularProfiles.results.map((profile) => (
              <Profile key={profile.id} profile={profile} />
            ))
          )}
        </>
      ) : (
        <Asset spinner />
      )}
     
    </Container>
  );
};

export default PopularProfiles;