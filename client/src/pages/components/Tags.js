import React from "react";
import { Chip, ListItem } from "@material-ui/core";

function Tag() {
	const [chipData, setChipData] = React.useState([
		{ _id: 0, tagText: 'dad', tagColour: '#'+Math.floor(Math.random() * 200).toString(16) },
		{ _id: 1, tagText: 'uncle', tagColour: '#'+Math.floor(Math.random() * 200).toString(16) },
		{ _id: 2, tagText: 'cousin', tagColour: '#'+Math.floor(Math.random() * 200).toString(16) },
		{ _id: 3, tagText: 'brother', tagColour: '#'+Math.floor(Math.random() * 200).toString(16) },
		{ _id: 4, tagText: 'niece', tagColour: '#'+Math.floor(Math.random() * 200).toString(16) },
	]);

	const handleDelete = (chipToDelete) => () => {
		setChipData((chips) => chips.filter((chip) => chip._id !== chipToDelete._id));
	};
	return (
		<div className="listTags">
			{chipData.map((data) => {
				return (
					<ListItem key={data._id} style={{ padding: "2px" }}>
						<Chip
							className="tag"
							label={data.tagText}
							style={{ backgroundColor: data.tagColour, fontSize:"12px",fontWeight:"bold" }}
							// size="small"
							// variant="outlined"
							onDelete={handleDelete(data)}
						/>
					</ListItem>
				);
			})}
		</div>
	);
}

export default Tag;

