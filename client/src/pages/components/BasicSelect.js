import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export default function BasicSelect() {
	const [tag, setTag] = useState("");

	const handleChange = (event) => {
		setTag(event.target.value);
	};

	return (
		<Box sx={{ minWidth: 120, maxWidth: 200 }}>
			<FormControl fullWidth>
				<InputLabel id="select-label">Tags</InputLabel>
				<Select
					labelId="select-label"
					id="simple-select"
					value={tag}
					label="Tag"
					onChange={handleChange}
				>
					<MenuItem value={10}>Ten</MenuItem>
					<MenuItem value={20}>Twenty</MenuItem>
					<MenuItem value={30}>Thirty</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);
}
