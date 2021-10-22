import React from "react";
// popup component for rendering register confirmation message
const RegisterConfirmation = (props) => {
	return (
		<div className="popup-box">
			<div className="box">{props.content}</div>
		</div>
	);
};

export default RegisterConfirmation;
