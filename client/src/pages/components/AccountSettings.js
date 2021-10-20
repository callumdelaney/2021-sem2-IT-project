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
import { Image } from "cloudinary-react";
import Tag from "./Tags";

// ContactUpdate is a child component of Contact()
function AccountSettings() {
	const [userInfo] = useGlobalState("userInfo");
	const [userTags] = useGlobalState("userTags");
	// set state variables (default to contact details)
	// eslint-disable-next-line
	const [firstName, setFirstName] = useState(userInfo.firstName);
	const [lastName, setLastName] = useState(userInfo.lastName);
	const [email, setEmail] = useState(userInfo.username);
	const [phoneNumber, setPhoneNumber] = useState(userInfo.phone);

	const [tags, setTags] = useState(userTags);
	// eslint-disable-next-line
	const [status, setStatus] = useState(statusCode.SUCCESS);

	const [photo, setPhoto] = useState(null /* set to props.photo later */);
	const [preview, setPreview] = useState(defaultUser);
	const [publicID, setPublicID] = useState(userInfo.photo);
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
		var localStatus = status;
		var localPhotoId = userInfo.photo;

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
					var userData = {
						firstName: firstName,
						lastName: lastName,
						username: email,
						photo: localPhotoId,
						phone: phoneNumber,
					};
					axios
						.post("/api/update-user", userData)
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
			var userData = {
				firstName: firstName,
				lastName: lastName,
				username: email,
				photo: localPhotoId,
				phone: phoneNumber,
			};
			// console.log(firstName, lastName, email);
			// use axios to post user data to back end for processing, use
			// response to test for validity
			axios
				.post("/api/update-user", userData)
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

				<button
					type="submit"
					style={{ height: "3rem", marginRight: "5rem" }}
				>
					Save
				</button>
				{/* create contact button brings up a popup */}
				{/* cropped photo display */}
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
			</form>
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
					width: "30%",
					flexWrap: "wrap",
				}}
			>
				<div
					style={{
						// width: "50%",
						paddingTop: "1rem",
					}}
				>
					<h2>Your Tags</h2>
					<Tag inTable={false} tags={userTags}></Tag>
				</div>
			</div>
		</article>
	);
}

export default AccountSettings;
