import React, { useState } from "react";
import { useGlobalState } from "state-pool";
import ManageAccountsIcon from "@material-ui/icons/AccountCircle";
import LogoutIcon from "@material-ui/icons/MeetingRoom";
import TagCreator from "./TagCreator";
import DeleteIcon from "@material-ui/icons/Delete";
import defaultUser from "../../images/default-user.png";
import { Image } from "cloudinary-react";
import { Redirect } from "react-router-dom";
import quack from "../../audio/quack.mp3";

function UserInfo() {
	// eslint-disable-next-line
	const [contactInfo, setContactInfo] = useGlobalState("contactInfo");
	// eslint-disable-next-line
	const [userTags, setUserTags] = useGlobalState("userTags");
	// eslint-disable-next-line
	const [userContacts, setUserContacts] = useGlobalState("userContacts");
	// eslint-disable-next-line
	const [accountSettings, setAccountSettings] = useGlobalState(
		"openAccountSettings"
	);
	const [userInfo, setUserInfo] = useGlobalState("userInfo");
	// eslint-disable-next-line
	const [openAccount, setOpenAccount] = useGlobalState("openAccountSettings");
	const [loggedOut, setLoggedOut] = useState(false);
	const sound = new Audio(quack);

	const handleProfileClick = () => {
		setOpenAccount(true);
	};
	const handleTagDeleteClick = () => {
		console.log("delete tag");
	};
	const handleLogoutClick = () => {
		sound.volume = 0.2;
		sound.play();
		// hopefully passport will redirect back to login automatically
		fetch("/api/logout")
			.then(() => {
				setLoggedOut(true);
				setContactInfo({ firstName: -1, tags: [], photo: "" });
				setUserTags([]);
				setUserContacts([]);
				setAccountSettings(false);
				setUserInfo({});
			})
			.catch((error) => {
				console.log(error);
			});
	};
	if (loggedOut) {
		return <Redirect to="/login" />;
	}
	return (
		<>
			<div className="user-info">
				{userInfo.photo !== null && userInfo.photo !== "" ? (
					<Image cloudName="duckroll" publicId={userInfo.photo} />
				) : (
					<img src={defaultUser} alt="default" />
				)}
				<h1>
					Hello, {userInfo.firstName} {userInfo.lastName}
				</h1>
				<div>
					<button onClick={handleProfileClick}>
						<div style={{ display: "flex" }}>
							<ManageAccountsIcon
								style={{ paddingRight: "0.5rem" }}
							/>
							Profile Settings
						</div>
					</button>

					<button onClick={handleLogoutClick}>
						<div style={{ display: "flex" }}>
							<LogoutIcon style={{ paddingRight: "0.5rem" }} />
							Logout
						</div>
					</button>
					<TagCreator />
					<button>
						<div style={{ display: "flex" }}>
							<DeleteIcon style={{ paddingRight: "0.1rem" }} />
							Delete Tag
						</div>
					</button>
				</div>
				<h4>{userInfo.username}</h4>
			</div>
		</>
	);
}

export default UserInfo;
