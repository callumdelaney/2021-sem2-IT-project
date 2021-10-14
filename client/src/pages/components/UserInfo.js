import React from "react";
import { useGlobalState } from "state-pool";

function UserInfo() {
	const [userInfo] = useGlobalState("userInfo");
	return (
		<div className="user-info">
			<img src={userInfo.photo} alt="userphoto" />
			<h1>
				Hello, {userInfo.firstName} {userInfo.lastName}
			</h1>
			<div>
				<button>Profile Settings</button>
			</div>
			<h4>{userInfo.email}</h4>
		</div>
	);
}

export default UserInfo;
