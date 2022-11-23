import { fireEvent, render, screen } from "@testing-library/react"
import {BrowserRouter as Router} from 'react-router-dom';
import SignInForm from '../SignInForm';

test('renders SignInForm', () => {
  render(
		<Router>
			<SignInForm />
		</Router>
	);
	const usernameEl = screen.getByPlaceholderText('Enter username');
	const passwordEl = screen.getByPlaceholderText('Password');
	const signinBtnEl = screen.getByRole('button', {name: 'Sign in'})
	const signUpLinkEl = screen.getByRole('link', {text: 'Sign up today!'})
	expect(usernameEl).toBeInTheDocument();
	expect(passwordEl).toBeInTheDocument();
	expect(signinBtnEl).toBeInTheDocument();
	expect(signUpLinkEl).toBeInTheDocument();
});

test('user can change signin inputs', () => {
  render(
		<Router>
			<SignInForm />
		</Router>
	);
	const usernameEl = screen.getByPlaceholderText('Enter username');
	const testUsername = "Maja";
	fireEvent.change(usernameEl, { target: { value: testUsername } });
	const passwordEl = screen.getByPlaceholderText('Password');
	const testPassword = "thisismypassword";
	fireEvent.change(passwordEl, { target: { value: testPassword } })
	
	expect(usernameEl.value).toBe(testUsername);
	expect(passwordEl.value).toBe(testPassword);
});

test('button is disabled if signin inputs not filled', () => {
  render(
		<Router>
			<SignInForm />
		</Router>
	);
	const usernameEl = screen.getByPlaceholderText('Enter username');
	const testUsername = "Maja";
	fireEvent.change(usernameEl, { target: { value: testUsername } });
	const passwordEl = screen.getByPlaceholderText('Password');
	const testPassword = "";
	fireEvent.change(passwordEl, { target: { value: testPassword } })
	const signinBtnEl = screen.getByRole('button', {name: 'Sign in'})
	
	expect(signinBtnEl).toBeDisabled();
});

test('button is not disabled if signin inputs are filled', () => {
  render(
		<Router>
			<SignInForm />
		</Router>
	);
	const usernameEl = screen.getByPlaceholderText('Enter username');
	const testUsername = "Maja";
	fireEvent.change(usernameEl, { target: { value: testUsername } });
	const passwordEl = screen.getByPlaceholderText('Password');
	const testPassword = "password";
	fireEvent.change(passwordEl, { target: { value: testPassword } })
	const signinBtnEl = screen.getByRole('button', {name: 'Sign in'})
	
	expect(signinBtnEl).not.toBeDisabled();
});