import React from "react";
import TagCreatorDialog from "./TagCreatorDialog";
import { Button } from "@mui/material";
function TagCreator() {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button variant="outlined" onClick={handleClickOpen}>
				Create Tag
			</Button>
			<TagCreatorDialog open={open} onClose={handleClose} />
		</div>
	);
}

export default TagCreator;
