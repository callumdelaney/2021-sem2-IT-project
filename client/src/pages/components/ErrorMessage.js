import React from "react";
import errorIcon from "../../images/error.png";
// returns a custom error message set by the statusCode prop
function ErrorMessage(props) {
  const code = props.statusCode;
  var text = "";
  // different possible codes
  if (code === 11) {
    text = "email address not found";
  } else if (code === 12) {
    text = "incorrect email or password";
  } else if (code === 13) {
    text = "email already exists";
  } else if (code === 14) {
    text = "password is too short (must be at least 5 characters)";
  }
  // return error if status is not a SUCCESS
  if (code !== 1) {
    return (
      <div className="errorMessage">
        <img src={errorIcon} alt="ErrorIcon" width="15" height="15" />
        <h7 className="errorText">{text}</h7>
      </div>
    );
  }
  return <div></div>;
}

export default ErrorMessage;
