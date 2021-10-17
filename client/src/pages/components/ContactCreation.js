import React, { useState } from "react";
import axios from "axios";
import statusCode from "./Status";
import Popup from "./Popup";
import {
	FormControlLabel,
	Radio,
	RadioGroup,
	Box,
	OutlinedInput,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
	Chip,
	Dialog,
	DialogTitle,
	DialogContent,
} from "@material-ui/core";
import { useGlobalState } from "state-pool";
import defaultUser from "../../images/default-user.png";
import StyledCropper from "./crop/CropperEz";
import { Image } from "cloudinary-react";
// ContactCreation is a child component of Contact()
function ContactCreation() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [category, setCategory] = useState("business");
	const [notes, setNotes] = useState("");
	// eslint-disable-next-line

	const [photo, setPhoto] = useState(null);
	const [preview, setPreview] = useState(defaultUser);
	const [publicID, setPublicID] = useState("");

	// eslint-disable-next-line
	const [tags, setTags] = useState([]);
	// eslint-disable-next-line
	const [status, setStatus] = useState(statusCode.SUCCESS);
	const [userTags] = useGlobalState("userTags");

	const fileSelectedHandler = (e) => {
		console.log(e.target.files[0]);
		if (e.target.files.length > 0) {
			setPreview(e.target.files[0]);
		}
	};
	const handleCallBack = (croppedImage) => {
		setPhoto(croppedImage);
		// should be object, not url
		console.log(croppedImage);
	};

	const [dialogOpen, setDialogOpen] = useState(false);
	const handleDialog = () => {
		setDialogOpen(!dialogOpen);
	};

	// toggle state for confirmation popup
	const [isOpen, setIsOpen] = useState(false);
	const togglePopup = () => {
		setIsOpen(!isOpen);
	};

	const [tagNames, setTagNames] = useState([]);
	// handle change function for tags, searches through userTags and creates a list
	// of all tags based on selected names
	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		// set tagNames to a list of all selected tag names
		var localTagNames =
			typeof value === "string" ? value.split(",") : value;
		setTagNames(localTagNames);

		var tagList = [];
		userTags.forEach((tag) => {
			// if the tag name is in our list of selected tag names, push it to tagList
			// use localTagNames as it is immediately updated
			if (localTagNames.includes(tag.tagText)) {
				tagList.push(tag);
			}
		});
		// set contact tags to our tagList
		setTags(tagList);
	};

	const handleSubmit = (e) => {
		// default action refreshes page
		e.preventDefault();

		console.log("tags: ", tags);
		var localStatus = status;
		var localPhotoId = "";

		// if user has supplied a photo and cropped it successfully, we can post it to cloudinary
		if (photo != null) {
			const formData = new FormData();
			formData.append("file", photo);
			console.log(photo);
			formData.append("upload_preset", "cc16t03g");
			console.log("sending to cloudinary...");
			axios
				.post(
					"https://api.cloudinary.com/v1_1/duckroll/image/upload",
					formData
				)
				.then((response) => {
					console.log(response);
					setPublicID(response.data.public_id);
					localPhotoId = response.data.public_id;
					console.log(localPhotoId);

					// embed another axios call on getting response
					var contactData = {
						firstName: firstName,
						lastName: lastName,
						email: email,
						category: category,
						phoneNumber: phoneNumber,
						notes: notes,
						photo: localPhotoId,
						tags: tags,
					};
					axios
						.post("/api/add-contact", contactData)
						.then((response) => {
							console.log(response.data);
							// since status won't change until the end of this function, need local status
							// to keep track of the actual value
							localStatus = response.data.status;
							if (localStatus === statusCode.SUCCESS) {
								togglePopup();
							}
						})
						.catch((error) => {
							console.log(error);
						});
				});
		} else {
			// contact details
			var contactData = {
				firstName: firstName,
				lastName: lastName,
				email: email,
				category: category,
				phoneNumber: phoneNumber,
				notes: notes,
				photo: localPhotoId,
				tags: tags,
			};
			// use axios to post user data to back end for processing, use
			// response to test for validity
			axios
				.post("/api/add-contact", contactData)
				.then((response) => {
					console.log(response.data);
					// since status won't change until the end of this function, need local status
					// to keep track of the actual value
					localStatus = response.data.status;
					if (localStatus === statusCode.SUCCESS) {
						togglePopup();
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};
	// color constants used in styles
	const cadetBlue = "rgba(58, 119, 107, 0.9)";

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
				<div style={{ width: "100%" }}>
					<RadioGroup
						className="contact-form-category"
						row
						value={category}
						onChange={(e) => setCategory(e.target.value)}
					>
						<FormControlLabel
							value="business"
							control={
								<Radio
									style={{
										color: cadetBlue,
									}}
								/>
							}
							label={
								<span
									style={{
										fontSize: "22px",
										fontWeight: "bold",
										fontFamily: "Oswald, sans-serif",
									}}
								>
									Business
								</span>
							}
							// default to business unless changed
						/>
						<FormControlLabel
							value="personal"
							control={<Radio style={{ color: cadetBlue }} />}
							// label="Personal"
							label={
								<span
									style={{
										fontSize: "22px",
										fontWeight: "bold",
										fontFamily: "Oswald, sans-serif",
									}}
								>
									Personal
								</span>
							}
						/>
					</RadioGroup>
					{/* div for photo upload */}
					<div>
						<label
							htmlFor="photo"
							style={{
								fontSize: "22px",
								fontWeight: "bold",
								width: "9rem",
								marginLeft: "2rem",
							}}
						>
							Upload Photo
						</label>
						<input
							type="file"
							onClick={handleDialog}
							onChange={fileSelectedHandler}
							accept="image/*"
							style={{
								background: cadetBlue,
								color: "#EEE",
							}}
						/>
					</div>

					<Dialog open={dialogOpen} onClose={handleDialog} fullWidth>
						<DialogTitle>Crop Image</DialogTitle>
						<DialogContent>
							<StyledCropper
								img={
									preview === defaultUser
										? defaultUser
										: URL.createObjectURL(preview)
								}
								callBack={handleCallBack}
							/>
						</DialogContent>
					</Dialog>
				</div>

				<button type="submit">Save</button>
			</form>
			{/* contact saved popup component */}
			{isOpen && (
				<Popup
					content={
						<>
							<h1 className="contact-popup-box">
								Contact Saved!
							</h1>
							<div className="contact-popup-button">
								<button
									className=""
									onClick={() => {
										// REFRESH PAGE
										window.location.reload(false);
									}}
								>
									Close
								</button>
							</div>
						</>
					}
				/>
			)}
			{/* div for tag selection */}
			<div
				style={{
					display: "inline-flex",
					width: "20%",
					flexWrap: "wrap",
				}}
			>
				{/* select menu for tags */}
				<Box
					sx={{
						minWidth: "100%",
						maxWidth: "100%",
					}}
				>
					<FormControl fullWidth>
						<InputLabel
							id="multiple-chip-label"
							style={{
								color: "#52410f",
								padding: "0rem 0.8rem",
								// fontFamily: "Oswald, sans-serif",
								fontWeight: "bold",
							}}
						>
							Tags
						</InputLabel>
						<Select
							labelId="multiple-chip-label"
							id="multiple-chip"
							multiple
							style={{
								border: "1px solid #52410f",
							}}
							value={tagNames}
							onChange={handleChange}
							input={
								<OutlinedInput
									id="select-multiple-chip"
									label="Chip"
								/>
							}
							renderValue={(selected) => (
								<Box
									sx={{
										display: "flex",
										flexWrap: "wrap",
										gap: 3.5,
									}}
								>
									{selected.map((value) => (
										<Chip key={value} label={value} />
									))}
								</Box>
							)}
							MenuProps={{
								PaperProps: {
									style: {
										maxHeight: 48 * 4.5 + 8,
										width: 180,
									},
								},
								getContentAnchorEl: null,
								anchorOrigin: {
									vertical: "bottom",
									horizontal: "left",
								},
							}}
						>
							{/* available options */}
							{userTags.map((data) => {
								return (
									<MenuItem
										key={data._id}
										value={data.tagText}
									>
										{data.tagText}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
				</Box>
				{publicID === "" ? (
					<img src={defaultUser} alt="default" />
				) : (
					<Image
						style={{
							marginTop: "5rem",
							border: "3px solid #52410f",
							borderRadius: "6px",
						}}
						cloudName="duckroll"
						publicId={publicID}
					/>
				)}
			</div>
		</article>
	);
}

export default ContactCreation;
