import React from "react";
import { useState, useEffect } from "react";
import { Redirect } from "react-router";
import ContactsTable from "./components/ContactsTable";
import Contact from "./components/Contact";
import UserInfo from "./components/UserInfo";
import { store, useGlobalState } from "state-pool";
//import { userTags } from "./components/data";
import AccountSettings from "./components/AccountSettings";
import statusCode from "./components/Status";
import walkingDuck from "../images/walking-duck.gif";

// declare a global state variable, contactInfo, with an initial "unselected" state
store.setState("contactInfo", { firstName: -1, tags: [], photo: "" });
// declare global userTags variable to keep track of user tags
store.setState("userTags", []);
store.setState("userContacts", []);
store.setState("openAccountSettings", false);
store.setState("userInfo", {});

/*Contacts page main function*/
function Contacts() {
	// 0 is pending data retrieval, 1 is success and -1 is fail to authenticate
	const [loadingStatus, setLoadingStatus] = useState(0);
	const [tagsRetrieved, setTagsRetrieved] = useState(false);
	const [userRetrieved, setUserRetrieved] = useState(false);
	const [contactsRetrieved, setContactsRetrieved] = useState(false);
	//get global tags
	// eslint-disable-next-line
	const [userTags, setUserTags] = useGlobalState("userTags");
	//get global user info
	// eslint-disable-next-line
	const [userInfo, setUserInfo] = useGlobalState("userInfo");
	// eslint-disable-next-line
	const [userContacts, setUserContacts] = useGlobalState("userContacts");
	useEffect(() => {
		fetch("/api/get-tags")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setTagsRetrieved(true);
				setUserTags(data.tags);
			})
			.catch((error) => {
				console.log(error);
			});
		fetch("/api/get-user-details")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.status === statusCode.SUCCESS) {
					setUserRetrieved(true);
				} else if (data.status === statusCode.FAILURE) {
					setLoadingStatus(-1);
				}
				setUserInfo(data.user);
			})
			.catch((error) => {
				console.log(error);
			});
		fetch("/api/get-contacts")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.status === statusCode.SUCCESS) {
					setContactsRetrieved(true);
				} else if (data.status === statusCode.FAILURE) {
					setLoadingStatus(-1);
				}
				setUserContacts(data.contacts);
			})
			.catch((error) => {
				console.log(error);
			});
		// eslint-disable-next-line
	}, []);

	const [openAccount] = useGlobalState("openAccountSettings");

	if (loadingStatus === -1) {
		return <Redirect to="/login" />;
	} else if (!(tagsRetrieved && userRetrieved && contactsRetrieved)) {
		return (
			<div
				style={{
					display: "block",
					marginLeft: "auto",
					marginRight: "auto",
					width: "15%",
					paddingTop: "16%",
				}}
			>
				<img
					src={walkingDuck}
					alt="walking-duck"
					style={{ width: "100%" }}
				/>
			</div>
		);
	}
	return (
		<>
			<div className="flex-container">
				<div className="flex-child">
					{/* Left-hand table showing records of user contacts */}
					<ContactsTable />
				</div>
				<div className="flex-child">
					{/* div displaying user information */}
					<UserInfo />
					{/* component displaying contact-info */}
					{openAccount ? <AccountSettings /> : <Contact />}
				</div>
			</div>
		</>
	);
}

export default Contacts;
