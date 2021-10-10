import React, { useState } from "react";
import { ChromePicker } from "react-color";

import { Popover } from "@mui/material";

// Component for color pallet when creating tags
function ColorPicker(props) {
	const [anchor, setAnchor] = useState(null);
	const [color, setColor] = useState(props.color);
	const [opacity, setOpacity] = useState(props.opacity);
	const [bg, setBg] = useState(props.bg);

	const openPopover = (e) => {
		setAnchor(e.currentTarget);
	};
	const handleChange = (data) => {
		// color has the hex code, bg(background) has the hsl code, opacity has the opacity value
		setColor(data.hex);
		setBg(data.hsl);
		setOpacity(data.hsl.a);
	};

	//console.log(color);
	return (
		<div>
			{/* Color Pallet included in popover, so it does not take space in the tool bar */}
			<button
				onClick={openPopover}
				style={{ backgroundColor: props.color }}
			>
				Pick Color
			</button>
			<Popover
				open={Boolean(anchor)}
				anchorEl={anchor}
				anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
				transformOrigin={{ vertical: "top", horizontal: "left" }}
				onClose={() => {
					setAnchor(null);

					props.callBack(color, opacity, bg);
				}}
			>
				<ChromePicker color={bg} onChange={handleChange}></ChromePicker>
			</Popover>
		</div>
	);
}

export default ColorPicker;
