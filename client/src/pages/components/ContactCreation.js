import React, { useState } from "react";
import axios from "axios";
import statusCode from "./Status";
import Popup from "./Popup";
import {
    FormControlLabel,
    Radio,
    RadioGroup,
    Box,
    OutlinedInput,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
} from "@material-ui/core";
import { store, useGlobalState } from "state-pool";
import ErrorMessage from "./ErrorMessage";
import defaultUser from "../../images/default-user.png";
import StyledCropper from "./crop/CropperEz";
// ContactCreation is a child component of Contact()
function ContactCreation() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [category, setCategory] = useState("business");
    const [notes, setNotes] = useState("");
    // eslint-disable-next-line

    const [photo, setPhoto] = useState(null);
    const [preview, setPreview] = useState(defaultUser);

    // eslint-disable-next-line
    const [tags, setTags] = useState("");
    // eslint-disable-next-line
    const [status, setStatus] = useState(statusCode.SUCCESS);
    const [userTags] = useGlobalState("userTags");

    const fileSelectedHandler = (e) => {
        console.log(e.target.files[0]);
        if (e.target.files.length > 0) {
            setPreview(URL.createObjectURL(e.target.files[0]));
        }
    };
    const handleCallBack = (croppedImage) => {
        setPhoto(croppedImage);
        console.log(croppedImage);
    };

    const [dialogOpen, setDialogOpen] = useState(false);
    const handleDialog = () => {
        setDialogOpen(!dialogOpen);
    };

    // toggle state for confirmation popup
    const [isOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const [tagNames, setTagNames] = useState([]);
    // handle change function for tags, searches through userTags and creates a list
    // of all tags based on selected names
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        // set tagNames to a list of all selected tag names
        var localTagNames =
            typeof value === "string" ? value.split(",") : value;
        setTagNames(localTagNames);

        var tagList = [];
        userTags.forEach((tag) => {
            // if the tag name is in our list of selected tag names, push it to tagList
            // use localTagNames as it is immediately updated
            if (localTagNames.includes(tag.tagText)) {
                tagList.push(tag);
            }
        });
        // set contact tags to our tagList
        setTags(tagList);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(tags);
        var localStatus = status;

        // if more than 5 tags are selected, display error message
        if (tags.length > 5) {
            setStatus(statusCode.TOO_MANY_TAGS);
            localStatus = statusCode.TOO_MANY_TAGS;
            // don't post data
            return;
        } else {
            setStatus(statusCode.SUCCESS);
            localStatus = statusCode.SUCCESS;
        }

        // contact details
        var contactData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            category: category,
            phoneNumber: phoneNumber,
            notes: notes,
            photo: photo,
            tags: tags,
        };
        // use axios to post user data to back end for processing, use
        // response to test for validity
        axios
            .post("/api/add-contact", contactData)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        // since status won't change until the end of this function, need local status
        // to keep track of the actual value
        if (localStatus === statusCode.SUCCESS) {
            togglePopup();
        }
    };

    // color constants used in styles
    const businessColor = "orange";
    const personalColor = "yellow";

    return (
        // Contents of the page, each seperated by a div. each div contains a label and a
        // corresponding input field. Required fields are firstName, lastName, email and category
        <article className="contact-article">
            <h1 className="header">Add Contact</h1>
            <form className="contact-form" action="" onSubmit={handleSubmit}>
                <div className="contact-form-control">
                    <label htmlFor="firstName">First name: </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="contact-form-control">
                    <label htmlFor="lastName">Last name: </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="contact-form-control">
                    <label htmlFor="email">Email: </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="contact-form-control">
                    <label htmlFor="Phone">Phone number: </label>
                    <input
                        type="number"
                        id="phone"
                        name="phone"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div className="contact-form-control">
                    <label htmlFor="notes" style={{ paddingBottom: "150px" }}>
                        Notes:{" "}
                    </label>
                    <textarea
                        className="contact-form-notes"
                        name="notes"
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        cols="30"
                        rows="10"
                        placeholder="Write Something..."
                    ></textarea>
                </div>
                {/* category labels */}
                <div style={{ width: "100%" }}>
                    <RadioGroup
                        className="contact-form-category"
                        row
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <FormControlLabel
                            value="business"
                            control={<Radio style={{ color: businessColor }} />}
                            label={
                                <span style={{ fontSize: "22px" }}>
                                    Business
                                </span>
                            }
                            style={{ fontSize: "22px" }}
                            // default to business unless changed
                        />
                        <FormControlLabel
                            value="personal"
                            control={<Radio style={{ color: personalColor }} />}
                            // label="Personal"
                            label={
                                <span style={{ fontSize: "22px" }}>
                                    Personal
                                </span>
                            }
                        />
                    </RadioGroup>
                    {/* div for photo upload */}
                    {photo != null && (
                        <img src={URL.createObjectURL(photo)} alt="" />
                    )}
                    <div>
                        <label htmlFor="photo" style={{ fontSize: "15px" }}>
                            Upload Photo
                        </label>
                        <input
                            type="file"
                            onClick={handleDialog}
                            onChange={fileSelectedHandler}
                            accept="image/*"
                        />
                    </div>

                    <Dialog open={dialogOpen} onClose={handleDialog} fullWidth>
                        <DialogTitle>Crop Image</DialogTitle>
                        <DialogContent>
                            <button>Confirm</button>
                            <StyledCropper
                                img={preview}
                                callBack={handleCallBack}
                            />
                        </DialogContent>
                    </Dialog>
                </div>

                <button type="submit">Save</button>
                {/* contact saved popup component */}
                {isOpen && (
                    <Popup
                        content={
                            <>
                                <h1 className="contact-popup-box">
                                    Contact Saved!
                                </h1>
                                <div className="contact-popup-button">
                                    <button className="" onClick={togglePopup}>
                                        Close
                                    </button>
                                </div>
                            </>
                        }
                    />
                )}
            </form>
            {/* div for tag selection */}
            <div
                style={{
                    display: "inline-flex",
                    width: "20%",
                    flexWrap: "wrap",
                }}
            >
                {/* select menu for tags */}
                <Box sx={{ minWidth: "100%", maxWidth: "100%" }}>
                    <FormControl fullWidth>
                        <InputLabel id="multiple-chip-label">Tags</InputLabel>
                        <Select
                            labelId="multiple-chip-label"
                            id="multiple-chip"
                            multiple
                            value={tagNames}
                            onChange={handleChange}
                            input={
                                <OutlinedInput
                                    id="select-multiple-chip"
                                    label="Chip"
                                />
                            }
                            renderValue={(selected) => (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 3.5,
                                    }}
                                >
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: 48 * 4.5 + 8,
                                        width: 180,
                                    },
                                },
                                getContentAnchorEl: null,
                                anchorOrigin: {
                                    vertical: "bottom",
                                    horizontal: "left",
                                },
                            }}
                        >
                            {/* available options */}
                            {userTags.map((data) => {
                                return (
                                    <MenuItem
                                        key={data._id}
                                        value={data.tagText}
                                    >
                                        {data.tagText}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Box>
                {/* error message for too many tags */}
                <ErrorMessage statusCode={status} />
            </div>
        </article>
    );
}

export default ContactCreation;
