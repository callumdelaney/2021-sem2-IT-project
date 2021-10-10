import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle } from "@mui/material";
import ColorPicker from "./ColorPicker";

function TagCreatorDialog(props) {
    // useState hooks for color picker
    const [color, setColor] = useState("#fff");
    const [opacity, setOpacity] = useState("1");
    const [bg, setBg] = useState({
        h: 250,
        s: 0,
        l: 0.2,
        a: 1,
    });
    const { onClose, open } = props;

    // callback function to obtain color values from color picker
    const handleCallBack = (color, opacity, bg) => {
        setColor(color);
        setOpacity(opacity);
        setBg(bg);
        // console.log(bg);
        // console.log(color);
        // console.log(opacity);
    };

    const handleClose = () => {
        // add axios call here then redirect to /contacts
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open} disableEnforceFocus>
            <DialogTitle>Create Tag</DialogTitle>
            <ColorPicker
                color={color}
                opacity={opacity}
                bg={bg}
                callBack={handleCallBack}
            />
            <div
                style={{
                    width: "100%",
                    display: "flex",
                }}
            >
                <input
                    style={{
                        width: "30%",
                        // display: "block",
                    }}
                ></input>
                <button
                    style={{
                        width: "20%",
                    }}
                >
                    create tag
                </button>
            </div>
            <button onClick={handleClose}>close</button>
        </Dialog>
    );
}

export default TagCreatorDialog;
