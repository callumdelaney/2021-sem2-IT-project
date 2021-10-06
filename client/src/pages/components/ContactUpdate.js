import React, { useState } from "react";
import axios from "axios";
import statusCode from "./Status";
import Popup from "./Popup";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { useGlobalState } from "state-pool";

function ContactUpdate(props) {
	// set state variables (default to contact details)
	// eslint-disable-next-line
	const [info, setInfo] = useGlobalState("contactInfo");
	const [firstName, setFirstName] = useState(props.firstName);
	const [lastName, setLastName] = useState(props.lastName);
	const [email, setEmail] = useState(props.email);
	const [phoneNumber, setPhoneNumber] = useState(props.phoneNumber);
	const [category, setCategory] = useState(props.category);
	const [notes, setNotes] = useState(props.notes);
	// eslint-disable-next-line
	const [photo, setPhoto] = useState(props.photo);
	// eslint-disable-next-line
	const [status, setStatus] = useState(statusCode.SUCCESS);

	// toggle state for confirmation popup
	const [isOpen, setIsOpen] = useState(false);
	const togglePopup = () => {
		setIsOpen(!isOpen);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		var localStatus = statusCode.SUCCESS;
		setStatus(statusCode.SUCCESS);
		// contact details
		var userData = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			category: category,
			phoneNumber: phoneNumber,
			notes: notes,
		};
		// use axios to post user data to back end for processing, use
		// response to test for validity
		axios
			.post("/api/editContact", userData)
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
		// since status won't change until the end of this function, need local status
		// to keep track of the actual value
		if (localStatus === statusCode.SUCCESS) {
			togglePopup();
		}
	};

	// color constants used in styles
	const businessColor = "orange";
	const personalColor = "yellow";

	return (
		// Contents of the page, each seperated by a div
		<article className="contact-article">
			<h1 className="header">Edit Contact</h1>
			<form className="contact-form" action="" onSubmit={handleSubmit}>
				<div className="contact-form-control">
					<label htmlFor="firstName">First name: </label>
					<input
						type="text"
						id="firstName"
						name="firstName"
						required
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					/>
				</div>
				<div className="contact-form-control">
					<label htmlFor="lastName">Last name: </label>
					<input
						type="text"
						id="lastName"
						name="lastName"
						required
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
				</div>
				<div className="contact-form-control">
					<label htmlFor="email">Email: </label>
					<input
						type="text"
						id="email"
						name="email"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="contact-form-control">
					<label htmlFor="Phone">Phone number: </label>
					<input
						type="number"
						id="phone"
						name="phone"
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
					/>
				</div>
				<div className="contact-form-control">
					<label htmlFor="notes" style={{ paddingBottom: "150px" }}>
						Notes:{" "}
					</label>
					<textarea
						className="contact-form-notes"
						name="notes"
						id="notes"
						value={notes}
						onChange={(e) => setNotes(e.target.value)}
						cols="30"
						rows="10"
						placeholder="Write Something..."
					></textarea>
				</div>
				{/* category labels */}
				<div style={{ marginLeft: "20px" }}>
					<RadioGroup
						className="contact-form-category"
						row
						onChange={(e) => setCategory(e.target.value)}
					>
						<FormControlLabel
							value="business"
							control={<Radio style={{ color: businessColor }} />}
							label={
								<span style={{ fontSize: "22px" }}>
									Business
								</span>
							}
							// style={{ fontSize: "22px" }}
							checked={category === "business"}
						/>
						<FormControlLabel
							value="personal"
							control={<Radio style={{ color: personalColor }} />}
							label={
								<span style={{ fontSize: "22px" }}>
									Personal
								</span>
							}
							checked={category === "personal"}
						/>
					</RadioGroup>
				</div>

				{/* changes contact info onClick */}
				<button type="submit">Save</button>
				{/* contact saved popup component */}
				{isOpen && (
					<Popup
						content={
							<>
								<h1 className="contact-popup-box">
									Contact Updated Successfully!
								</h1>
								<div className="contact-popup-button">
									<button
										className=""
										onClick={() => {
											// onclick toggles popup and updates info
											togglePopup();
											setInfo({
												addContact: false,
												editContact: false,
												firstName: firstName,
												lastName: lastName,
												category: category,
												notes: notes,
												phoneNumber: phoneNumber,
												email: email,
												photo: photo,
											});
										}}
									>
										Close
									</button>
								</div>
							</>
						}
					/>
				)}
			</form>
		</article>
	);
}

export default ContactUpdate;
