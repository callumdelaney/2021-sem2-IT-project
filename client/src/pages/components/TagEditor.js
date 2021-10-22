import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    TextField,
    DialogContent,
} from "@material-ui/core";
import ColorPicker from "./ColorPicker";
// import axios from "axios";
import EditIcon from "@material-ui/icons/Edit";

function TagEditor() {
    const [tagName, setTagName] = useState("");
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    // useState hooks for color picker
    // const [color, setColor] = useState("#fff");
    // const [opacity, setOpacity] = useState("1");
    // const [hsl, setHsl] = useState({
    //     h: 250,
    //     s: 0,
    //     l: 0.2,
    //     a: 1,
    // });
    return (
        <div style={{ display: "inline" }}>
            <button onClick={handleClickOpen}>
                <div style={{ display: "flex" }}>
                    <EditIcon style={{ marginRight: "0.2rem" }} />
                    Edit Tag
                </div>
            </button>
            <Dialog onClose={handleClose} open={open} disableEnforceFocus>
                <DialogTitle>Edit Tag</DialogTitle>
                <DialogContent>
                    <ColorPicker
                        color={color}
                        opacity={opacity}
                        hsl={hsl}
                        tagName={tagName}
                    />
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                        }}
                    >
                        <TextField
                            fullWidth
                            type="text"
                            id="tagName"
                            value={tagName}
                            onChange={(e) => setTagName(e.target.value)}
                        ></TextField>
                        {/* <button
							style={{
								width: "20%",
							}}
							onClick={handleClick}
						>
							create tag
						</button> */}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default TagEditor;
