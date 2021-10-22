import React from "react";
import ContactCreation from "./ContactCreation";
import { useGlobalState } from "state-pool";
import ContactUpdate from "./ContactUpdate";
import Tag from "./Tags";
import axios from "axios";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import { Paper, makeStyles } from "@material-ui/core";
import defaultUser from "../../images/default-user.png";
import EmailIcon from "@material-ui/icons/Email";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import NotesIcon from "@material-ui/icons/Notes";
import { Image } from "cloudinary-react";
import Popup from "./Popup";

// contact-info content
function Contact() {
	const [info, setInfo] = useGlobalState("contactInfo");
	// toggle state for confirmation popup
	const [isOpen, setIsOpen] = React.useState(false);
	const togglePopup = () => {
		setIsOpen(!isOpen);
	};
	const useStyles = makeStyles((theme) => ({
		paperStyle: {
			margin: theme.spacing(1),
			width: theme.spacing(1, "auto"),
			padding: theme.spacing(5),
		},
		noteStyle: {
			margin: theme.spacing(1),
			width: theme.spacing(1, "auto"),
			paddingLeft: theme.spacing(5),
			paddingRight: theme.spacing(5),
		},
	}));
	const classes = useStyles();
	// function for handling the click of edit button
	const handleEditClick = () => {
		setInfo({
			addContact: false,
			editContact: true,
			firstName: info.firstName,
			lastName: info.lastName,
			category: info.category,
			notes: info.notes,
			phone: info.phone,
			email: info.email,
			photo: info.photo,
			_id: info._id,
			tags: info.tags,
		});
	};
	// function for handling delete contact button
	const handleDeleteClick = (contact_id) => {
		console.log("delete");
		console.log(contact_id);
		console.log(info._id);

		var toDelete = {
			_id: contact_id,
		};
		axios
			.post("/api/delete-contact", toDelete)
			.then((response) => {
				console.log(response.data);
				// REFRESH PAGE
				window.location.reload(false);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	// display contact creation area if no contact is selected or user presses add contact button
	if (info.firstName === -1 || info.addContact) {
		return <ContactCreation />;
	}
	if (info.editContact) {
		return (
			<ContactUpdate
				firstName={info.firstName}
				lastName={info.lastName}
				category={info.category}
				notes={info.notes}
				phone={info.phone}
				email={info.email}
				photo={info.photo}
				_id={info._id}
				tags={info.tags}
			/>
		);
	}

	// main contact info area
	return (
		<div className="contact-info">
			{/* contact photo and name */}
			<div className="contact-info-name">
				{info.photo === null || info.photo === "" ? (
					<img
						style={{
							marginTop: "1rem",
							border: "3px solid #52410f",
							borderRadius: "6px",
						}}
						src={defaultUser}
						alt="default"
					/>
				) : (
					<Image
						style={{
							marginTop: "1rem",
							border: "3px solid #52410f",
							borderRadius: "6px",
						}}
						cloudName="duckroll"
						publicId={info.photo}
					/>
				)}
				<h1>
					{info.firstName} {info.lastName}
				</h1>
			</div>
			{/* one main div surrounding two seperate divs, one for phone No. & email, other side for tags  */}
			<div style={{ display: "inline-flex" }}>
				<div style={{ width: "fit-content" }}>
					<div
						style={{
							display: "inline-flex",
							width: "100%",
							marginLeft: "3rem",
						}}
					>
						{/* phone number */}
						<Paper className={classes.paperStyle} elevation={3}>
							<h2
								style={{ border: "none", paddingRight: "50px" }}
							>
								<ContactPhoneIcon /> Phone Number:
							</h2>
							<h2>{info.phone}</h2>
						</Paper>
					</div>
					<div
						style={{
							display: "inline-flex",
							width: "100%",
							marginLeft: "3rem",
						}}
					>
						{/* email */}
						<Paper className={classes.paperStyle} elevation={3}>
							<h2
								style={{ border: "none", paddingRight: "50px" }}
							>
								<EmailIcon /> Email:
							</h2>
							<h2>{info.email}</h2>
						</Paper>
					</div>
				</div>
				{/* second half of this div is where the tags g */}
				<div
					style={{
						width: "50%",
						// paddingTop: "1rem",
						// paddingLeft: "1rem",
						padding: "2rem 2rem",
					}}
				>
					<Tag inTable={false} tags={info.tags}></Tag>
				</div>
			</div>
			<div
				style={{
					display: "inline-block",
					width: "90%",
					marginRight: "2rem",
					marginLeft: "3rem",
				}}
			>
				{/* descripton/notes */}
				<Paper className={classes.paperStyle} elevation={3}>
					<h2
						style={{
							border: "none",
							padding: "0px 10px",
							letterSpacing: "2px",
							marginLeft: "-0.8rem",
						}}
					>
						<NotesIcon /> Notes:{" "}
					</h2>
					<p
						style={{
							maxWidth: "100%",
							display: "inline",
							padding: "10px",
							letterSpacing: "2px",
							// fontWeight: "bold",
							fontFamily: "Arial, sans-serif",
						}}
					>
						{info.notes}
					</p>
				</Paper>
			</div>
			{isOpen && (
				<Popup
					content={
						<>
							<h2 className="contact-popup-box">
								Are you sure you want to delete
							</h2>
							<h2
								style={{
									fontSize: "40px",
									display: "flex",
									fontWeight: "bold",
								}}
							>
								{" "}
								{info.firstName} {info.lastName}
							</h2>
							<div className="contact-popup-button">
								<button
									className="edit-delete-buttons"
									style={{ color: "#b30000" }}
									onClick={() => {
										handleDeleteClick(info._id);
									}}
								>
									<div style={{ display: "flex" }}>
										<DeleteIcon />
										Confirm Delete
									</div>
								</button>
								<button
									className="edit-delete-buttons"
									onClick={() => {
										togglePopup();
									}}
								>
									Close
								</button>
							</div>
						</>
					}
				/>
			)}
			{/* Edit and delete Buttons */}
			<div style={{ display: "inline" }}>
				<button
					className="edit-delete-buttons"
					style={
						{
							// display: "flex",
						}
					}
					onClick={() => {
						handleEditClick();
						// togglePopup();
					}}
				>
					<div style={{ display: "flex" }}>
						<EditIcon />
						Edit
					</div>
				</button>
				<button
					style={{ color: "#b30000" }}
					className="edit-delete-buttons"
					onClick={() => {
						// handleDeleteClick(info._id);
						togglePopup();
					}}
				>
					<div style={{ display: "flex" }}>
						<DeleteIcon />
						Delete
					</div>
				</button>
			</div>
		</div>
	);
}

export default Contact;
