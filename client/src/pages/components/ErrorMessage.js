import React from "react";
import errorIcon from "../../images/error.png";
import status from "./Status";

// returns a custom error message set by the statusCode prop
function ErrorMessage(props) {
	const code = props.statusCode;
	var text = "";
	// different possible codes
	if (code === status.UNKNOWN_EMAIL) {
		text = "email address not found";
	} else if (code === status.INCORRECT_CREDENTIALS) {
		text = "incorrect email or password";
	} else if (code === status.EMAIL_TAKEN) {
		text = "email already exists";
	} else if (code === status.INVALID_PASSWORD) {
		text = "password is too short (must be at least 5 characters)";
	} else if (code === status.MISMATCHED_PASSWORDS) {
		text = "passwords don't match";
	}
	// return error if status is not a SUCCESS
	if (code !== status.SUCCESS) {
		return (
			<div className="errorMessage">
				<img src={errorIcon} alt="ErrorIcon" width="15" height="15" />
				<p className="errorText">{text}</p>
			</div>
		);
	}
	return <div></div>;
}

export default ErrorMessage;
