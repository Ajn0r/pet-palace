import { fireEvent, render, screen } from "@testing-library/react"
import {BrowserRouter as Router} from 'react-router-dom';
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import NavBar from '../NavBar';


test('renders NavBar', () => {
  render(
    <Router>
      <NavBar />
    </Router>    
  );
  const signInLink = screen.getByRole('link', {name: 'Sign in' });
  expect(signInLink).toBeInTheDocument();

});

test('render link to user profile for logged in user', async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>    
  );
  const profileAvatar = await screen.findByText('Maja');
  const newButton = await screen.findByText('New');
  expect(profileAvatar).toBeInTheDocument();
  expect(newButton).toBeInTheDocument();
});

test('renders Sign in and Sign up buttons once user is logged out', async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>    
  );
  const signOutLink = await screen.findByRole('link', {name: 'Sign out'});
  fireEvent.click(signOutLink);
  const signInLink = await screen.findByRole('link', {name: 'Sign in'});
  const signUpLink = await screen.findByRole('link', {name: 'Sign up'});
  expect(signInLink).toBeInTheDocument();
  expect(signUpLink).toBeInTheDocument();
});