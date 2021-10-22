import React from "react";
import TagCreatorDialog from "./TagCreatorDialog";
import LabelIcon from "@material-ui/icons/Label";
function TagCreator() {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleCallBack = () => {
		handleClose();
	};

	return (
		<div style={{ display: "inline" }}>
			<button onClick={handleClickOpen}>
				<div style={{ display: "flex" }}>
					<LabelIcon style={{ paddingRight: "5px" }} />
					Create Tag
				</div>
			</button>
			<TagCreatorDialog
				open={open}
				callBack={handleCallBack} /*onClose={handleClose}*/
			/>
		</div>
	);
}

export default TagCreator;
