import React from "react";
import errorIcon from "../../images/error.png";

function ErrorMessage(props) {
  const code = props.statusCode;
  var text = "";

  if (code === 11) {
    text = "email address not found";
  }

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
