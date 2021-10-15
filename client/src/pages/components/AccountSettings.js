import React, { useState } from "react";
import axios from "axios";
import statusCode from "./Status";
import Popup from "./Popup";
import {
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
import TagCreator from "./TagCreator";

// ContactUpdate is a child component of Contact()
function AccountSettings() {
	const [userInfo] = useGlobalState("userInfo");
	const [userTags] = useGlobalState("userTags");
	// set state variables (default to contact details)
	// eslint-disable-next-line
	const [firstName, setFirstName] = useState(userInfo.firstName);
	const [lastName, setLastName] = useState(userInfo.lastName);
	const [email, setEmail] = useState(userInfo.email);
	const [phoneNumber, setPhoneNumber] = useState(userInfo.phoneNumber);

	const [tags, setTags] = useState(userTags);
	// eslint-disable-next-line
	const [status, setStatus] = useState(statusCode.SUCCESS);

	const [photo, setPhoto] = useState(null /* set to props.photo later */);
	const [preview, setPreview] = useState(defaultUser);

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
	// initialize tagNames with the names of all tags associated with user
	const [tagNames, setTagNames] = useState(
		userTags.map((tag) => tag.tagText)
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
		var localStatus = statusCode.SUCCESS;
		console.log(status);
		console.log(statusCode.SUCCESS);

		// contact details
		var userData = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			phoneNumber: phoneNumber,
		};
		// use axios to post user data to back end for processing, use
		// response to test for validity
		axios
			.post("/api/update-user", userData)
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
		if (localStatus === statusCode.SUCCESS) {
			togglePopup();
		}
	};

	const cadetBlue = "#52a594ea";

	return (
		// Contents of the page, each seperated by a div
		<article className="contact-article">
			<h1 className="header">Edit Account Settings</h1>
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
				{/* category labels */}
				<div style={{ width: "100%" }}>
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
								color: "#52410f",
							}}
						/>
					</div>

					<Dialog open={dialogOpen} onClose={handleDialog} fullWidth>
						<DialogTitle>Crop Image</DialogTitle>
						<DialogContent>
							<button>Confirm</button>
							<StyledCropper
								img={preview}
								callBack={handleCallBack}
							/>
						</DialogContent>
					</Dialog>
				</div>

				<button type="submit" style={{ marginRight: "12rem" }}>
					Save
				</button>
				{/* create contact button brings up a popup */}
				<TagCreator />
				{/* contact saved popup component */}
				{isOpen && (
					<Popup
						content={
							<>
								<h1 className="contact-popup-box">
									Account Updated Successfully!
								</h1>
								<div className="contact-popup-button">
									<button
										style={{ marginLeft: "-3rem" }}
										onClick={() => {
											// onclick toggles popup and updates info
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
			</form>
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
						<InputLabel
							id="multiple-chip-label"
							style={{
								color: "#52410f",
								padding: "0rem 0.8rem",
								// fontFamily: "Oswald, sans-serif",
								fontWeight: "bold",
							}}
						>
							Your Tags
						</InputLabel>
						<Select
							labelId="multiple-chip-label"
							id="multiple-chip"
							multiple
							style={{
								border: "1px solid #52410f",
							}}
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
				{/* error message for too many tags */}
				{/* <ErrorMessage statusCode={status} /> */}
				{/* cropped photo display */}
				{photo != null && (
					<img
						style={{
							marginTop: "5rem",
							border: "3px solid #52410f",
							borderRadius: "50%",
						}}
						src={URL.createObjectURL(photo)}
						alt=""
					/>
				)}
			</div>
		</article>
	);
}

export default AccountSettings;
