import { fireEvent, render, screen } from "@testing-library/react"
import {BrowserRouter as Router} from 'react-router-dom';
import SignUpForm from '../SignUpForm';

test('renders SignUpForm', () => {
  render(
		<Router>
			<SignUpForm />
		</Router>
	);
	const usernameEl = screen.getByPlaceholderText('Enter username');
	const passwordEl = screen.getByPlaceholderText('Password');
  const password2El = screen.getByPlaceholderText('Confirm password');
	const signupBtnEl = screen.getByRole('button', {name: 'Sign up'});
	const signInLinkEl = screen.getByRole('link', {text: 'Sign in!'});

	expect(usernameEl).toBeInTheDocument();
	expect(passwordEl).toBeInTheDocument();
  expect(password2El).toBeInTheDocument();
	expect(signupBtnEl).toBeInTheDocument();
	expect(signInLinkEl).toBeInTheDocument();
});

test('user can change signup inputs', () => {
  render(
		<Router>
			<SignUpForm />
		</Router>
	);
	const usernameEl = screen.getByPlaceholderText('Enter username');
	const testUsername = "Maja";
	fireEvent.change(usernameEl, { target: { value: testUsername } });

	const passwordEl = screen.getByPlaceholderText('Password');
	const testPassword = "thisismypassword";
	fireEvent.change(passwordEl, { target: { value: testPassword } });

  const password2El = screen.getByPlaceholderText('Confirm password');
  const testPassword2 = "thisismypassword";
  fireEvent.change(password2El, { target: { value: testPassword2 } });
	
	expect(usernameEl.value).toBe(testUsername);
	expect(passwordEl.value).toBe(testPassword);
    expect(password2El.value).toBe(testPassword2);
});

test('button is disabled if signup inputs not filled', () => {
  render(
		<Router>
			<SignUpForm />
		</Router>
	);
	const usernameEl = screen.getByPlaceholderText('Enter username');
	const testUsername = "Maja";
	fireEvent.change(usernameEl, { target: { value: testUsername } });

	const passwordEl = screen.getByPlaceholderText('Password');
	const testPassword = "";
	fireEvent.change(passwordEl, { target: { value: testPassword } });
	
  const signUpBtnEl = screen.getByRole('button', {name: 'Sign up'});
	
	expect(signUpBtnEl).toBeDisabled();
});

test('button is not disabled if signup inputs are filled', () => {
  render(
		<Router>
			<SignUpForm />
		</Router>
	);
	const usernameEl = screen.getByPlaceholderText('Enter username');
	const testUsername = "Maja";
	fireEvent.change(usernameEl, { target: { value: testUsername } });

	const passwordEl = screen.getByPlaceholderText('Password');
	const testPassword = "password";
	fireEvent.change(passwordEl, { target: { value: testPassword } });

  const password2El = screen.getByPlaceholderText('Confirm password');
  const testPassword2 = "thisismypassword";
  fireEvent.change(password2El, { target: { value: testPassword2 } });

  const signupBtnEl = screen.getByRole('button', {name: 'Sign up'});
	
	expect(signupBtnEl).not.toBeDisabled();
});