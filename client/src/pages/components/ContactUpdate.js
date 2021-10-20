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
import StyledCropper from "./crop/CropperEz";
import defaultUser from "../../images/default-user.png";
import { Image } from "cloudinary-react";

// ContactUpdate is a child component of Contact()
function ContactUpdate(props) {
	// set state variables (default to contact details)
	// eslint-disable-next-line
	const [info, setInfo] = useGlobalState("contactInfo");
	const [_id] = useState(props._id);
	const [firstName, setFirstName] = useState(props.firstName);
	const [lastName, setLastName] = useState(props.lastName);
	const [email, setEmail] = useState(props.email);
	const [phone, setPhone] = useState(props.phone);
	const [category, setCategory] = useState(props.category);
	const [notes, setNotes] = useState(props.notes);
	// eslint-disable-next-line

	const [tags, setTags] = useState(props.tags);
	// eslint-disable-next-line
	const [status, setStatus] = useState(statusCode.SUCCESS);
	const [userTags] = useGlobalState("userTags");

	const [photo, setPhoto] = useState("" /* set to props.photo later */);
	const [preview, setPreview] = useState(defaultUser);
	const [publicID, setPublicID] = useState(props.photo);
	const [changedPhoto, setChangedPhoto] = useState(false);

	const fileSelectedHandler = (e) => {
		console.log(e.target.files[0]);
		if (
			e.target.files.length > 0 &&
			e.target.files[0].type.includes("image")
		) {
			// setPhoto(e.target.files[0]);
			setPreview(URL.createObjectURL(e.target.files[0]));
		}
	};

	const handleCallBack = (croppedImage) => {
		setPhoto(croppedImage);
		console.log(croppedImage);
		setChangedPhoto(true);
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
	// initialize tagNames with the names of all tags associated with this contact upon going
	// into edit mode
	const [tagNames, setTagNames] = useState(
		props.tags.map((tag) => tag.tagText)
	);
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
		e.preventDefault();

		console.log(tags);

		var localStatus = status;
		var localPhotoId = props.photo;

		// if user has supplied a photo and cropped it successfully, we can post it to cloudinary
		if (photo != null && changedPhoto) {
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
						_id: _id,
						firstName: firstName,
						lastName: lastName,
						email: email,
						category: category,
						phone: phone,
						notes: notes,
						photo: localPhotoId,
						tags: tags,
					};
					axios
						.post("/api/update-contact", contactData)
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
				_id: _id,
				firstName: firstName,
				lastName: lastName,
				email: email,
				category: category,
				phone: phone,
				notes: notes,
				photo: localPhotoId,
				tags: tags,
			};
			console.log(firstName, lastName, email);
			// use axios to post user data to back end for processing, use
			// response to test for validity
			axios
				.post("/api/update-contact", contactData)
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
	const cadetBlue = "rgba(58, 119, 107, 0.9)";

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
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
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
						onChange={(e) => setCategory(e.target.value)}
					>
						<FormControlLabel
							value="business"
							control={<Radio style={{ color: cadetBlue }} />}
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
							control={<Radio style={{ color: cadetBlue }} />}
							label={
								<span style={{ fontSize: "22px" }}>
									Personal
								</span>
							}
							checked={category === "personal"}
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
								img={preview}
								callBack={handleCallBack}
							/>
						</DialogContent>
					</Dialog>
				</div>

				{/* changes contact info onClick */}
				<button type="submit">Save</button>
			</form>

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
									style={{ marginLeft: "-3rem" }}
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
				<Box sx={{ minWidth: "100%", maxWidth: "100%" }}>
					<FormControl fullWidth>
						<InputLabel id="multiple-chip-label">Tags</InputLabel>
						<Select
							labelId="multiple-chip-label"
							id="multiple-chip"
							multiple
							// initial value will be current contact tags
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
				{publicID === null || publicID === "" ? (
					<img
						style={{
							marginTop: "5rem",
							border: "3px solid #52410f",
							borderRadius: "6px",
						}}
						src={defaultUser}
						alt="default"
					/>
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

export default ContactUpdate;
