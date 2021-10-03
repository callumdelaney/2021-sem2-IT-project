import React, { useState } from "react";
import axios from "axios";
import statusCode from "./Status";
import Popup from "./Popup";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";

function ContactCreation() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [category, setCategory] = useState("");
	const [notes, setNotes] = useState("");
	// eslint-disable-next-line
	const [photo, setPhoto] = useState("");
	// eslint-disable-next-line
	const [tags, setTags] = useState("");
	// eslint-disable-next-line
	const [status, setStatus] = useState(statusCode.SUCCESS);

	// toggle state for confirmation popup
	const [isOpen, setIsOpen] = useState(false);
	const togglePopup = () => {
		setIsOpen(!isOpen);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		var localStatus = status;
		// contact details
		var contactData = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			category: category,
			phoneNumber: phoneNumber,
			notes: notes,
			photo: photo,
			tags: tags,
		};
		// use axios to post user data to back end for processing, use
		// response to test for validity
		axios
			.post("/api/add-contact", contactData)
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
		// Contents of the page, each seperated by a div. each div contains a label and a
		// corresponding input field. Required fields are firstName, lastName, email and category
		<article className="contact-article">
			<h1 className="header">Add Contact</h1>
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
							style={{ fontSize: "22px" }}
							// default to business unless changed
							checked={true}
						/>
						<FormControlLabel
							value="personal"
							control={<Radio style={{ color: personalColor }} />}
							// label="Personal"
							label={
								<span style={{ fontSize: "22px" }}>
									Personal
								</span>
							}
						/>
					</RadioGroup>
				</div>

				<button type="submit">Save</button>
				{/* contact saved popup component */}
				{isOpen && (
					<Popup
						content={
							<>
								<h1 className="contact-popup-box">
									Contact Saved!
								</h1>
								<div className="contact-popup-button">
									<button className="" onClick={togglePopup}>
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

export default ContactCreation;
