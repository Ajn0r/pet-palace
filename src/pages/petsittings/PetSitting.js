import React from "react";
import { Link, useHistory } from "react-router-dom";

import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Avatar from "../../components/Avatar";
import { DropDownManage } from "../../components/DropDownManage";

import styles from "../../styles/Petsitting.module.css";
import appStyles from "../../App.module.css";

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
		petsitter_username,
		petsittingPage,
		contact,
		petsitter_contact,
	} = props;

	const currentUser = useCurrentUser();
	const is_owner = currentUser?.username === owner;
	const is_petsitter = currentUser?.username === petsitter_username;
	const history = useHistory();

	const handleEdit = () => {
		history.push(`/petsittings/${id}/edit`);
	};

	const handleDelete = async () => {
		try {
			await axiosRes.delete(`/petsittings/${id}`);
			history.push("/petsittings")
		} catch (err) {""}
	};

	return (
		<>
			<div className={`container shadow p-4 mb-5 ml-sm-4 ${styles.Petsitting}`}>
        {is_owner && petsittingPage && (
          <div className="float-right">
						<DropDownManage
							handleEdit={handleEdit}
							handleDelete={handleDelete}
						/>
					</div>)}
				<div  className={`row mb-5 ${styles.ImgRow}`}>
					<div className={`col-md-4 text-center d-flex justify-content-center`}>
						<Link 
							to={`/profiles/${profile_id}`}
							className={`d-flex flex-column`}
						>
							<Avatar 
								className={`${styles.AvatarImg}`}
								src={profile_image} height={140}
							/>
							<span className={` ${appStyles.SpanText}`}>
								Owner: {owner}
							</span>
						</Link>
					</div>

					<div className={`col-md-8 flex-column text-center pt-3`}>
						<h3>Petsitting: {id}</h3>
						<p>{updated_at}</p>
						<p>Start date: {date_from} - End date: {date_to}</p>
						<h4>Pets to sit: </h4>
						{pets?.length ? (
							pets?.map((pet) => {
								return (
									<Link
										to={
											`/pets/${pet}`
										}
										key={pet}>
										<i className="fas fa-paw"></i>
									</Link>
								)
							})
						) : (<p>No pets registered</p>)}
						
					</div>
				</div>

				<div className={`row ${styles.ImgRow} text-center`}>
					<div className="col-md-4 col-lg-5">
						<h4>Description: </h4>
						<p>{description}</p>
						</div>
					<div className={`col-md-4 col-lg-5`}>
						<h4>Details:</h4>
						<p>Location: {location}</p>
						{is_owner || is_petsitter ? (<p>Compensation: {compensation}</p>) : (null)}
						{contact && (<p>How to contact owner: {contact}</p>)}
						{petsitter_contact && (<p>Petsitter contact: {petsitter_contact}</p>)}
						<p>Stauts: {get_status_display}</p>
					</div>
					<div className={`col-md-4 col-lg-2 text-center d-flex justify-content-center flex-column float-right`}>
						<Link
							to={`/profiles/${petsitter}`}
							className={`d-flex flex-column`}
							>
							<Avatar 
								src={petsitter_profile_image} height={140}
							/>
							<span className={` ${appStyles.SpanText}`}>
								Petsitter: {petsitter_username}
							</span>
						</Link>	
					</div>
				</div>
			</div>
		</>
	);
};

export default PetSitting;