import React, { useState, useEffect } from "react";
import {
	Dialog,
	DialogTitle,
	TextField,
	DialogContent,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
	OutlinedInput,
} from "@material-ui/core";
import ColorPicker from "./ColorPicker";
import EditIcon from "@material-ui/icons/Edit";
import { useGlobalState } from "state-pool";
// import axios from "axios";

function TagEditor() {
	const [tagName, setTagName] = useState("");
	const [newTagName, setNewTagName] = useState("");
	const [open, setOpen] = useState(false);
	const [userTags] = useGlobalState("userTags");
	const [tag, setTag] = useState({});

	// useState hooks for color picker
	const [color, setColor] = useState("#fff");

	useEffect(() => {
		// change color of preview tag when the color changes
		if (document.getElementById("tagPreview") != null) {
			document.getElementById("tagPreview").style["background"] = color;
		}
	}, [color]);
	const handleCallBack = (color, opacity, hsl) => {
		setColor(hsl);
	};
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = (e) => {
		console.log(e.target.value);
		var localTagName = e.target.value;

		var localTag;
		userTags.forEach((tag) => {
			// if the tag name matches our selected tagname, then update the tag to this object
			if (localTagName === tag.tagText) {
				localTag = tag;
			}
		});

		setTagName(e.target.value);
		setNewTagName(e.target.value);
		setTag(localTag);
		setColor(localTag.tagColour);
	};
	const handleClick = () => {
		console.log(tag);
		console.log(newTagName, color);
	};

	return (
		<div style={{ display: "inline" }}>
			<button onClick={handleClickOpen}>
				<div style={{ display: "flex" }}>
					<EditIcon style={{ marginRight: "0.2rem" }} />
					Edit Tag
				</div>
			</button>
			<Dialog onClose={handleClose} open={open} disableEnforceFocus>
				<DialogTitle>Edit Tag</DialogTitle>
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
							labelId="select-chip-label"
							id="select-chip"
							style={{
								border: "1px solid #52410f",
							}}
							value={tagName}
							onChange={handleChange}
							input={
								<OutlinedInput
									id="select-multiple-chip"
									label="Chip"
								/>
							}
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
					<ColorPicker
						color={color}
						hsl={color}
						tagName={newTagName}
						callBack={handleCallBack}
					/>
					<div
						style={{
							width: "100%",
							display: "flex",
						}}
					>
						<TextField
							fullWidth
							type="text"
							id="tagName"
							value={newTagName}
							onChange={(e) => setNewTagName(e.target.value)}
						></TextField>
						<button
							style={{
								width: "20%",
							}}
							onClick={handleClick}
						>
							Confirm Edit
						</button>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default TagEditor;
