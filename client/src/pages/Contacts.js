import React from "react";
import { useEffect } from "react";
import ContactsTable from "./components/ContactsTable";
import Contact from "./components/Contact";
import UserInfo from "./components/UserInfo";
import { store, useGlobalState } from "state-pool";
//import { userTags } from "./components/data";
import AccountSettings from "./components/AccountSettings";

// declare a global state variable, contactInfo, with an initial "unselected" state
store.setState("contactInfo", { firstName: -1, tags: [], photo: "" });
// declare global userTags variable to keep track of user tags

store.setState("userTags", []);

store.setState("userContacts", []);

store.setState("openAccountSettings", false);

/*Contacts page main function*/
function Contacts() {
	//get global tags
	// eslint-disable-next-line
	const [userTags, setUserTags] = useGlobalState("userTags");
	useEffect(() => {
		fetch("/api/get-tags")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setUserTags(data.tags);
			})
			.catch((error) => {
				console.log(error);
			});
		// eslint-disable-next-line
	}, []);

	//get global user ingo
	// eslint-disable-next-line
	const [userInfo, setUserInfo] = useGlobalState("userInfo");

	useEffect(() => {
		fetch("/api/get-user-details")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setUserInfo(data.user);
			})
			.catch((error) => {
				console.log(error);
			});
		// eslint-disable-next-line
	}, []);

	const [openAccount] = useGlobalState("openAccountSettings");
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
