import React, { useState } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	Select,
	OutlinedInput,
	MenuItem,
	Box,
	Chip,
	FormControl,
	InputLabel,
} from "@material-ui/core";
import { useGlobalState } from "state-pool";
import DeleteIcon from "@material-ui/icons/Delete";
import statusCode from "./Status";
import axios from "axios";

function TagDeleter() {
	const [open, setOpen] = useState(false);
	const [userTags] = useGlobalState("userTags");
	const [tagName, setTagName] = useState("");
	const [tagNames, setTagNames] = useState([]);
	const [tags, setTags] = useState([]);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

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

	const handleDelete = () => {
		var localStatus = statusCode.FAILURE;
		console.log(tags);
		var tagData = {
			tags: tags,
		};

		axios
			.post("/api/delete-tags", tagData)
			.then((response) => {
				console.log(response.data);
				localStatus = response.data.status;
				if (localStatus === statusCode.SUCCESS) {
					// REFRESH PAGE
					window.location.reload(false);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div style={{ display: "inline" }}>
			<button onClick={handleClickOpen}>
				<div style={{ display: "flex" }}>
					<DeleteIcon style={{ paddingRight: "0.1rem" }} />
					Delete Tag
				</div>
			</button>
			<Dialog
				onClose={handleClose}
				open={open}
				disableEnforceFocus
				fullWidth
			>
				<DialogTitle
					style={{
						textAlign: "center",
						fontFamily: "Oswald, sans-serif",
					}}
				>
					<span
						style={{
							fontSize: "28px",
							fontWeight: "bold",
							fontFamily: "Oswald, sans-serif",
							color: "rgba(0,0,0,0.8)",
							letterSpacing: "1px",
						}}
					>
						Delete Tags
					</span>
				</DialogTitle>
				<DialogContent>
					<FormControl
						fullWidth
						style={{
							width: "60%",
							marginLeft: "7rem",
						}}
					>
						<InputLabel
							id="multiple-chip-label"
							style={{
								color: "#52410f",
								padding: "0rem 0.8rem",
								// fontFamily: "Oswald, sans-serif",
								fontWeight: "bold",
								// marginLeft: "5rem",
								// marginRight: "auto",
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
								// width: "60%",
								// marginLeft: "auto",
								// marginRight: "auto",
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
					<button
						className="delete-tags-button"
						style={{ marginLeft: "13rem" }}
						onClick={handleDelete}
					>
						Delete Selected Tags
					</button>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default TagDeleter;
