import React, { useEffect } from "react";

import ContactsTable from "./components/ContactsTable";
import Contact from "./components/Contact";
import UserInfo from "./components/UserInfo";
import { store } from "state-pool";
import { userTags } from "./components/data";

// declare a global state variable, contactInfo, with an initial "unselected" state
store.setState("contactInfo", { firstName: -1, tags: [] });
// declare global userTags variable to keep track of user tags
store.setState("userTags", userTags);

/*Contacts page main function*/
function Contacts() {
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
					<Contact />
				</div>
			</div>
		</>
	);
}

export default Contacts;
