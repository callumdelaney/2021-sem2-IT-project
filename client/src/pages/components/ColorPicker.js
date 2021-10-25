import React, { useState } from "react";
import { ChromePicker } from "react-color";
import { Chip } from "@material-ui/core";

// Component for color pallet when creating tags
function ColorPicker(props) {
	const [color, setColor] = useState(props.color);
	const [opacity, setOpacity] = useState(props.opacity);
	const [hsl, setHsl] = useState(props.hsl);
	var tagName = props.tagName;

	const formatHsl = () => {
		var h = hsl.h.toString();
		var s = (hsl.s * 100).toString();
		var l = (hsl.l * 100).toString();
		var a = opacity.toString();

		return "hsl(" + h + "," + s + "%," + l + "%," + a + ")";
	};
	const formatHslValue = (value) => {
		var h = value.h.toString();
		var s = (value.s * 100).toString();
		var l = (value.l * 100).toString();
		var a = value.a.toString();

		return "hsl(" + h + "," + s + "%," + l + "%," + a + ")";
	};

	const handleChange = (data) => {
		// color has the hex code, hsl has the hsl code, opacity has the opacity value
		setColor(data.hex);
		setHsl(data.hsl);
		setOpacity(data.hsl.a);
		props.callBack(color, opacity, formatHslValue(data.hsl));
	};

	return (
		<div>
			<Chip
				id="tagPreview"
				style={{
					marginBottom: "1rem",
					backgroundColor:
						typeof hsl === "object" ? formatHsl() : hsl,
				}}
				label={tagName}
			/>
			<ChromePicker
				color={hsl}
				onChange={(color) => handleChange(color)}
			></ChromePicker>
		</div>
	);
}

export default ColorPicker;
