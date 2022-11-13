import React from 'react';
import { Button } from 'react-bootstrap';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useRedirect } from '../../hooks/useRedirect';
import PostsPage from '../posts/PostsPage';

const StartPage = () => {
  useRedirect('loggedIn');
  const currentUser = useCurrentUser();

  const loggedInStartPage = (
    <>
      <PostsPage message="Nothing to see here, try searching for something else!"/>
    </>
  );

  const loggedOutStartPage = (
    <>
      <div>This will be the Startpage that users land on the first time and when not logged in
        <Button>Sign up</Button>
      </div>
    </>
  )

  return (
    <>
      {currentUser ? loggedInStartPage : loggedOutStartPage}
    </>
  )
}

export default StartPage