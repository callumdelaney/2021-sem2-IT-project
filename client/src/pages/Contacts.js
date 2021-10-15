import React from "react";

import ContactsTable from "./components/ContactsTable";
import Contact from "./components/Contact";
import UserInfo from "./components/UserInfo";
import AccountSettings from "./components/AccountSettings";
import { store, useGlobalState } from "state-pool";
import { userTags } from "./components/data";

// declare a global state variable, contactInfo, with an initial "unselected" state
store.setState("contactInfo", { firstName: -1, tags: [] });
// declare global userTags variable to keep track of user tags
store.setState("userTags", userTags);

store.setState("openAccountSettings", false);

/*Contacts page main function*/
function Contacts() {
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
