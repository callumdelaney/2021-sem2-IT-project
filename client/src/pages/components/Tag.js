import React from "react";
// import LabelIcon from '@material-ui/icons/Label';
import { Chip, Paper, ListItem } from "@material-ui/core";

function Tag(props) {
	const [chipData, setChipData] = React.useState([
		{ _id: 0, tagText: 'Angular', tagColour: '#'+Math.floor(Math.random() * 200).toString(16) },
		{ _id: 1, tagText: 'jQuery', tagColour: '#'+Math.floor(Math.random() * 200).toString(16) },
		{ _id: 2, tagText: 'Polymer', tagColour: '#'+Math.floor(Math.random() * 200).toString(16) },
		{ _id: 3, tagText: 'React', tagColour: '#'+Math.floor(Math.random() * 200).toString(16) },
		{ _id: 4, tagText: 'Vue.js', tagColour: '#'+Math.floor(Math.random() * 200).toString(16) },
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

