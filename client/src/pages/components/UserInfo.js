import React from "react";
import { useGlobalState } from "state-pool";
import ManageAccountsIcon from "@material-ui/icons/AccountCircle";
import LogoutIcon from "@material-ui/icons/MeetingRoom";
import { AppBar, Toolbar, Menu } from "@material-ui/core";

function UserInfo() {
	const [userInfo] = useGlobalState("userInfo");
	return (
		<>
			<div className="user-info">
				<img src={userInfo.photo} alt="userphoto" />
				<h1>
					Hello, {userInfo.firstName} {userInfo.lastName}
				</h1>
				<div>
					<button>
						<div style={{ display: "flex" }}>
							<ManageAccountsIcon
								style={{ paddingRight: "0.5rem" }}
							/>
							Profile Settings
						</div>
					</button>

					<button>
						<div style={{ display: "flex" }}>
							<LogoutIcon style={{ paddingRight: "0.5rem" }} />
							Logout
						</div>
					</button>
				</div>
				<h4>{userInfo.email}</h4>
			</div>
		</>
	);
}

export default UserInfo;
