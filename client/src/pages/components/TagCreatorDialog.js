import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    TextField,
    DialogContent,
} from "@material-ui/core";
import ColorPicker from "./ColorPicker";
import axios from "axios";
import statusCode from "./Status";

function TagCreatorDialog(props) {
    const [refresh, setRefresh] = useState(false);
    const [tagName, setTagName] = useState("");
    // useState hooks for color picker
    const [color, setColor] = useState("#fff");
    const [opacity, setOpacity] = useState("1");
    const [hsl, setHsl] = useState({
        h: 250,
        s: 0,
        l: 0.2,
        a: 1,
    });
    const open = props.open;

    // callback function to obtain color values from color picker
    const handleCallBack = (color, opacity, hsl) => {
        setColor(color);
        setOpacity(opacity);
        setHsl(hsl);
        console.log(hsl);
        console.log(color);
        console.log(opacity);
    };

    const formatHsl = (hslObj) => {
        var h = hsl.h.toString();
        var s = (hsl.s * 100).toString();
        var l = (hsl.l * 100).toString();
        var a = opacity.toString();
        return "hsl(" + h + "," + s + "%," + l + "%," + a + ")";
    };

    const handleClose = () => {
        props.callBack();
    };

    const handleClick = () => {
        var hslString = formatHsl(hsl);
        var tagData = {
            tagText: tagName,
            tagColour: hslString,
        };
        var localStatus = statusCode.SUCCESS;

        console.log(tagData);

        if (tagName === "") {
            // since white is default color, all we need to check is if the tag has a name
            setRefresh(false);
            // don't post
            return;
        }
        // add axios call here then redirect to /contacts
        axios
            .post("/api/add-tag", tagData)
            .then((response) => {
                console.log(response.data);
                // check if data was saved successfully
                localStatus = response.data.status;
            })
            .catch((error) => {
                console.log(error);
            });

        if (localStatus === statusCode.SUCCESS) {
            setRefresh(true);
        } else {
            console.log("tag was not created successfully");
            setRefresh(false);
            props.callBack();
            // onClose();
        }
    };

    if (refresh) {
        window.location.reload(false);
    }
    return (
        <Dialog onClose={handleClose} open={open} disableEnforceFocus>
            <DialogTitle>Create Tag</DialogTitle>
            <DialogContent>
                <ColorPicker
                    color={color}
                    opacity={opacity}
                    hsl={hsl}
                    callBack={handleCallBack}
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

                    <button
                        style={{
                            width: "20%",
                        }}
                        onClick={handleClick}
                    >
                        create tag
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default TagCreatorDialog;
