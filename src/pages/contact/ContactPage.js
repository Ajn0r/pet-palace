import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "../../styles/Contact.module.css";
import btnStyles from "../../styles/Button.module.css";

function ContactPage() {
	const [contactData, setContactData ] = useState({
		name: '',
		email: '',
		message: ''
	});

	const {
		name,
		email,
		message
	} = contactData;

	const handleChange = (event) => {
    setContactData({
      ...contactData,
      [event.target.name]: event.target.value,
    });
  };

	const handleSubmit = (event) => {
		event.preventDefault();
		window.alert('Thank you for your message');
		setContactData({name: '', email: '', message: ''});

	};

  return (
    <div className={`${styles.ContactPage} mx-auto card p-3 p-sm-5`}>
			<div className="text-center">
				<h2>Get in touch!</h2>
				<hr />
				<p>If you have any questions or need help with anything, do not hesitate to get in touch!</p>
			</div>
      <Form>
				<Form.Group className="mb-3" >
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Name"
						name="name"
						value={name}
						onChange={handleChange} />
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						name="email"
						value={email}
						placeholder="Enter email"
						onChange={handleChange} />
				</Form.Group>

				<Form.Group className="mb-3" >
					<Form.Label>Message</Form.Label>
					<Form.Control
						as="textarea"
						rows={5}
						name="message"
						value={message}							
						placeholder="You message..."
						onChange={handleChange} />
				</Form.Group>
				<Button 
					className={`${btnStyles.Button} `}
					onClick={handleSubmit}
				>
					Send
        </Button>
      </Form>
    </div>
  );
}

export default ContactPage;