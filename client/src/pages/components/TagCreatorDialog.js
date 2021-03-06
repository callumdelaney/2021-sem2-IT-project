import React, { useState } from "react";
import {
	Dialog,
	DialogTitle,
	TextField,
	DialogContent,
} from "@material-ui/core";
import ColorPicker from "./ColorPicker";
import axios from "axios";
import statusCode from "./Status";

function TagCreatorDialog(props) {
	const [refresh, setRefresh] = useState(false);
	const [tagName, setTagName] = useState("");
	// useState hooks for color picker
	const [color, setColor] = useState("#fff");
	const [opacity, setOpacity] = useState("1");
	const [hsl, setHsl] = useState({
		h: 250,
		s: 0,
		l: 0.2,
		a: 1,
	});
	const open = props.open;
	// callback function to obtain color values from color picker
	const handleCallBack = (color, opacity, hsl) => {
		setColor(color);
		setOpacity(opacity);
		setHsl(hsl);
	};

	const handleClose = () => {
		props.callBack();
	};

	const handleClick = () => {
		// hsl value is converted to string format from colorPicker
		var hslString = hsl;
		var tagData = {
			tagText: tagName,
			tagColour: hslString,
		};
		var localStatus = statusCode.SUCCESS;

		// console.log(tagData);

		if (tagName === "") {
			// since white is default color, all we need to check is if the tag has a name
			setRefresh(false);
			// don't post
			return;
		}
		// add axios call here then redirect to /contacts
		axios
			.post("/api/add-tag", tagData)
			.then((response) => {
				console.log(response.data);
				// check if data was saved successfully
				localStatus = response.data.status;
				if (localStatus === statusCode.SUCCESS) {
					setRefresh(true);
				} else {
					console.log("tag was not created successfully");
					setRefresh(false);
					props.callBack();
					// onClose();
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	if (refresh) {
		// REFRESH PAGE
		window.location.reload(false);
	}
	return (
		<Dialog onClose={handleClose} open={open} disableEnforceFocus>
			<DialogTitle>Create Tag</DialogTitle>
			<DialogContent>
				<ColorPicker
					color={color}
					opacity={opacity}
					hsl={hsl}
					tagName={tagName}
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
						value={tagName}
						onChange={(e) => setTagName(e.target.value)}
					></TextField>
					<button
						style={{
							width: "20%",
						}}
						onClick={handleClick}
					>
						create tag
					</button>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default TagCreatorDialog;
