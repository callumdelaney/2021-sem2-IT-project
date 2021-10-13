import React, { useState } from "react";
import { ChromePicker } from "react-color";

// Component for color pallet when creating tags
function ColorPicker(props) {
    const [color, setColor] = useState(props.color);
    const [opacity, setOpacity] = useState(props.opacity);
    const [hsl, setHsl] = useState(props.hsl);

    const handleChange = (data) => {
        // color has the hex code, hsl has the hsl code, opacity has the opacity value
        setColor(data.hex);
        setHsl(data.hsl);
        setOpacity(data.hsl.a);
        props.callBack(color, opacity, hsl);
    };

    return (
        <div>
            <div
                style={{
                    backgroundColor: props.color,
                    height: "1rem",
                    width: "20%",
                    padding: "2px",
                    margin: "2%",
                    border: "3px solid grey",
                }}
            ></div>
            <ChromePicker
                color={hsl}
                onChange={(color) => handleChange(color)}
            ></ChromePicker>
        </div>
    );
}

export default ColorPicker;
