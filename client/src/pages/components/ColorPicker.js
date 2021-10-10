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
        props.callBack(color, opacity, bg);
    };

    //console.log(color);
    return (
        <div>
            {/* Color Pallet included in popover, so it does not take space in the tool bar */}
            {/* <button
                // onClick={() => props.callBack(color, opacity, bg)}
                style={{ borderColor: props.color, borderRadius: "2rem" }}
            >
                Pick Color
            </button> */}
            <div
                style={{
                    backgroundColor: props.color,
                    height: "1rem",
                    width: "20%",
                    padding: "2px",
                    margin: "2%",
                    border: "3px solid grey",
                }}
            />
            <ChromePicker
                color={bg}
                onChange={(color) => handleChange(color)}
            ></ChromePicker>
            {/* </Popover> */}
        </div>
    );
}

export default ColorPicker;
