import React, { useEffect } from "react";
import ContactCreation from "./ContactCreation";
import { useGlobalState } from "state-pool";
import ContactUpdate from "./ContactUpdate";
import Tag from "./Tags";
import EmailIcon from "@material-ui/icons/Email";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import NotesIcon from "@material-ui/icons/Notes";
import { Paper, makeStyles } from "@material-ui/core";
// contact-info content
function Contact() {
	const [info, setInfo] = useGlobalState("contactInfo");

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

	useEffect(() => {
		// console.log(info.firstName);
		// console.log(info.tags);
	}, [info]);
	// function for handling the click of edit button
	const handleEditClick = () => {
		setInfo({
			addContact: false,
			editContact: true,
			firstName: info.firstName,
			lastName: info.lastName,
			category: info.category,
			notes: info.notes,
			phoneNumber: info.phoneNumber,
			email: info.email,
			photo: info.photo,
			id: info.id,
			tags: info.tags,
		});
	};
	// function for handling delete contact button
	const handleDeleteClick = () => {
		console.log("delete");
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
				phoneNumber={info.phoneNumber}
				email={info.email}
				photo={info.photo}
				id={info.id}
				tags={info.tags}
			/>
		);
	}
	console.log(info.firstName);
	console.log(info.tags);
	// main contact info area
	return (
		<div className="contact-info">
			{/* contact photo and name */}
			<div className="contact-info-name">
				<img src={info.photo} alt="contactPhoto" />
				<h1>
					{info.firstName} {info.lastName}
				</h1>
			</div>
			{/* one main div surrounding two seperate divs, one for phone No. & email, other side for tags  */}
			<div style={{ display: "inline-flex" }}>
				<div style={{ minWidth: "50%" }}>
					<div
						style={{
							display: "inline-flex",
							width: "100%",
							marginLeft: "3rem",
						}}
					>
						{/* phone number */}
						<Paper className={classes.paperStyle} elevation="3">
							<h2
								style={{ border: "none", paddingRight: "50px" }}
							>
								<ContactPhoneIcon /> Phone Number:
							</h2>
							<h2>{info.phoneNumber}</h2>
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
						<Paper className={classes.paperStyle} elevation="3">
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
						minWidth: "50%",
						paddingTop: "1rem",
						paddingLeft: "1rem",
					}}
				>
					<Tag inTable={false} tags={info.tags}></Tag>
				</div>
			</div>
			<div
				style={{
					display: "inline-block",
					width: "90%",

					marginLeft: "50px",
				}}
			>
				{/* descripton/notes */}
				<Paper className={classes.paperStyle} elevation="3">
					<h2
						style={{
							border: "none",
							padding: "0px 10px",
							letterSpacing: "2px",
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
			{/* Edit and delete Buttons */}
			<button
				style={{ display: "flex" }}
				onClick={() => {
					handleEditClick();
				}}
			>
				Edit
			</button>
			<button
				style={{ color: "red" }}
				onClick={() => {
					handleDeleteClick();
				}}
			>
				Delete
			</button>
		</div>
	);
}

export default Contact;
