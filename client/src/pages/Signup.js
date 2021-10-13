import React, { useState } from "react";
import axios from "axios";
import ErrorMessage from "./components/ErrorMessage";
import statusCode from "./components/Status";
import Popup from "./components/Popup";
import { Link } from "react-router-dom";
import duckrollLogo from "../images/duckroll-logo2.png";

// component for sign up page
function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [status, setStatus] = useState(statusCode.SUCCESS);
    // toggle state for confirmation popup
    const [isOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    // handleSubmit is executed when the submit button is clicked
    const handleSubmit = (e) => {
        e.preventDefault();
        // setError based on feedback from back-end
        var localStatus = status;
        // if the two password fields don't match, can't move forward
        if (password !== passwordConfirm) {
            // dynamically change border color of these elements to red
            console.log("went here");
            document.getElementById("password").style["border-color"] = "red";
            document.getElementById("passwordConfirm").style["border-color"] =
                "red";
            // change status code accordingly
            localStatus = statusCode.MISMATCHED_PASSWORDS;
            setStatus(statusCode.MISMATCHED_PASSWORDS);
            // don't post
            return;
        }
        // registration details
        var userData = {
            firstName: firstName,
            lastName: lastName,
            username: email,
            password: password,
            phoneNumber: phoneNumber,
        };
        // use axios to post user data to back end for processing, use
        // response to test for validity
        axios
            .post("/api/signup", userData)
            .then((response) => {
                console.log(response.data);
                // check if data was saved successfully
                localStatus = response.data.status;
                setStatus(localStatus);
                // since status won't change until the end of this function, need local status
                // to keep track of the actual value
                if (localStatus === statusCode.SUCCESS) {
                    togglePopup();
                }
            })
            .catch((error) => {
                console.log(error);
            });
        console.log(localStatus);
    };

    return (
        // Contents of the page, each seperated by a div
        <div style={{ display: "flex", height: "100vh", background: "beige" }}>
            {/* <img
                src={duckrollLogo}
                alt="logo"
                style={{
                    maxHeight: "10rem",
                    maxWidth: "15rem",
                }}
            /> */}
            {/* <h1 className="header">Sign Up</h1> */}
            {/* form div containing all of the required fields */}
            <form className="form" style={{marginTop: "10%"}} action="" onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="firstName">First name:* </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="lastName">Last name:* </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="email">Email:* </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="Phone">Phone number: </label>
                    <input
                        type="number"
                        id="phone"
                        name="phone"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password:* </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            // reset border color
                            document.getElementById("password").style[
                                "border-color"
                            ] = "transparent";
                        }}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="passwordConfirm">Confirm password:* </label>
                    <input
                        type="password"
                        id="passwordConfirm"
                        name="passwordConfirm"
                        required
                        value={passwordConfirm}
                        onChange={(e) => {
                            setPasswordConfirm(e.target.value);
                            // reset border color
                            document.getElementById("passwordConfirm").style[
                                "border-color"
                            ] = "transparent";
                        }}
                    />
                </div>
                <button type="submit">Register</button>
                {/* conditional rendering of error message based on status */}
                <ErrorMessage statusCode={status} />
            </form>
            {/* register confirmation popup component */}
            {isOpen && (
                <Popup
                    content={
                        <>
                            <b>Account Created Successfully!</b>
                            <p>
                                Thank you for your interest! <br /> you can now
                                login using your credentials
                            </p>
                            <Link to="/login">
                                <button className="popup-button">Login</button>
                            </Link>
                        </>
                    }
                />
            )}
        </div>
    );
}

export default Signup;
