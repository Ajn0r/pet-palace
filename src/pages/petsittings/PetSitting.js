import React from "react";
import { useHistory } from "react-router-dom";

import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Asset from "../../components/Asset";
import Avatar from "../../components/Avatar";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Row";

const PetSitting = (props) => {
	const {
		id,
		owner,
		petsitter,
		profile_id,
		profile_image,
		petsitter_profile_image,
		pets,
		date_from,
		date_to,
		updated_at,
		description,
		get_status_display,
		location,
		compensation,
		nr_of_pets_to_sit,
		petsitter_username,
		petsittingPage,
	} = props;

	const currentUser = useCurrentUser();
	const is_owner = currentUser?.username === owner;
	const is_petsitter = currentUser?.username === petsitter_username;
	const history = useHistory();

	const handleEdit = () => {
		history.push(`/petsittings/${id}/edit`);
	}

	const handleDelete = async () => {
		try {
			await axiosRes.delete(`/petsittings/${id}`);
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<>
		{is_owner || is_petsitter ? (
			<Container className="h-100">
				<Row>
					<Col md={4}>
						<Avatar src={profile_image} height={55}/>
						{owner}
					</Col>
					<Col md={8}>
						<h3>Petsitting: {id}</h3>
						<p>{date_from} - {date_to}</p>
						<span>{pets?.name}</span>
					</Col>
				</Row>

				<Row>
					<p>{description}</p>
				</Row>
				
				<Row>
					<Col md={8}>
						<p>Location: {location}</p>
						<p>Compensation: {compensation}</p>
						<p>Stauts: {get_status_display}</p>
					</Col>
					<Col md={4}>
						<Avatar src={petsitter_profile_image} height={55}/>
						{petsitter_username}
					</Col>
					
				</Row>
			
			</Container>
		) : (
			<Asset message={'No petsittings found'} />
		)}
		</>
	)
}

export default PetSitting;