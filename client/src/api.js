import { useState, useEffect } from "react";
import React from "react";

//const BASE_URL = "https://duckroll-crm.herokuapp.com/";
const BASE_URL = "http://localhost:3000";

// code is based off foodbuddy-frontendW9 lecture demonstration files from
// INFO30005_2021_SM1

/* route URLs as of 29/09/2021

 router.post('/api/login', controller.login);
router.post("/api/signup", controller.newUser);
//router.post("/api/update-user", controller.editUser);
//router.post("/api/update-user-password", controller.changePassword);

+ router.get("/api/get-contacts", connectEnsureLogin.ensureLoggedIn(), controller.getContacts);
+ router.get("/api/get-one-contact", connectEnsureLogin.ensureLoggedIn(), controller.getOneContact);
+ router.post("/api/add-contact", controller.addNewContact);
+ router.post("/api/update-contact", controller.editContact);
+ router.post("/api/delete-contact",  controller.deleteContact);
+ router.post("/api/add-note",  controller.addNote);
+ router.post("/api/change-category",  controller.changeCategory);

+ router.get("/api/get-tags", connectEnsureLogin.ensureLoggedIn(), controller.getTags);
router.get("/api/get-one-tag", connectEnsureLogin.ensureLoggedIn(), controller.getOneTag);
router.post("/api/get-user-tags",  connectEnsureLogin.ensureLoggedIn(), controller.getUserTags);
+ router.post("/api/add-tag", controller.addNewTag);
+ router.post("/api/update-tag", controller.editTag);
+ router.post("/api/delete-tag",  controller.deleteTag);

*/

/// these are not yet protected
//some of these or the backend may need to be modified, if the data they return/inputting format is difficult for the frontend.
//getting all contacts

//you can put them into already existing functions called by the buttons, or directly stick them onto buttons, as you normally do

////////////  CONTACTS //////////////

export function getAllContacts() {
	const endpoint = BASE_URL + "/api/get-contacts";
	return fetch(endpoint).then((res) => res.json());
}

//  I think it's like the above, except it also has an error screen and a loading screen.
export function useAllContacts() {
	const [loading, setLoading] = useState(true); // what shows while the thing is loading
	const [allContacts, setAllContacts] = useState([]); // what shows when the thing has loaded
	const [error, setError] = useState(null); // what shows when there's an error

	useEffect(() => {
		// try getting all contacts
		getAllContacts()
			//if all contacts got, then set the state to the retrieved contacts
			.then((allContacts) => {
				setAllContacts(allContacts);
				setLoading(false);
			})
			//set state to error state if caught an error
			.catch((e) => {
				console.log(e);
				setError(e);
				setLoading(false);
			});
	}, []);

	return {
		// return the states
		loading,
		allContacts,
		error,
	};
}

//get one contact by id.
// have to think of a way for the frontend to retrieve a contact id to be able to input
// the id into the function...
// note there's a chance we have to modify the backend url, so it's like
// /api/get-one-contact/[put contact id here]
function getOneContact(id) {
	const endpoint = BASE_URL + `/api/get-one-contact`;
	return fetch(endpoint).then((res) => res.json());
	//don't know if we're using axios/credential checking in this same manner
	//return axios.get(endpoint, {withCredentials:true}).then(res => res.data);
}

//get one contact, but with loading and error states
export function useOneContact(id) {
	//various states
	const [loading, setLoading] = useState(true);
	const [contact, setContact] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		//try getting the contact
		getOneContact(id)
			.then((contact) => {
				setContact(contact);
				setLoading(false);
			})
			//if there's an error in getting the contact, change state to error state
			.catch((e) => {
				console.log(e);
				setError(e);
				setLoading(false);
			});
	}, []);

	return {
		loading,
		contact,
		error,
	};
}

// posting https://reactnative.dev/docs/network

//creating a contact
export async function addContact(contact) {
	//get the url
	let endpoint = BASE_URL + "/api/add-contact";
	// ask to fetch, using the below settings
	try {
		const response = fetch(endpoint, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(contact),
		});

		//return response if any
		const json = await response.json();
		return json;
	} catch (error) {
		//catch any errors
		console.error(error);
	}
}

//edit contact
export async function updateContact(contactDetails) {
	//get the url
	let endpoint = BASE_URL + "/api/update-contact";
	// ask to fetch, using the below settings
	try {
		const response = fetch(endpoint, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(contactDetails),
		});

		//return response if any
		const json = await response.json();
		return json;
	} catch (error) {
		//catch any errors
		console.error(error);
	}
}

//delete contact
export async function deleteContact(id) {
	//get the url
	let endpoint = BASE_URL + "/api/delete-contact";
	// ask to fetch, using the below settings
	try {
		const response = fetch(endpoint, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(id),
		});

		//return response if any
		const json = await response.json();
		return json;
	} catch (error) {
		//catch any errors
		console.error(error);
	}
}

//add note
export async function addContactNote(note) {
	//get the url
	let endpoint = BASE_URL + "/api/add-note";
	// ask to fetch, using the below settings
	try {
		const response = fetch(endpoint, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(note),
		});

		//return response if any
		const json = await response.json();
		return json;
	} catch (error) {
		//catch any errors
		console.error(error);
	}
}

//change catergory
// details, i think would contain the contact id, and the catergory
export async function updateContactCategory(contactDetails) {
	//get the url
	let endpoint = BASE_URL + "/api/change-category";
	// ask to fetch, using the below settings
	try {
		const response = fetch(endpoint, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(contactDetails),
		});

		//return response if any
		const json = await response.json();
		return json;
	} catch (error) {
		//catch any errors
		console.error(error);
	}
}

/////////// TAGS ///////////

function getAllTags() {
	const endpoint = BASE_URL + "/api/get-tags";
	return fetch(endpoint).then((res) => res.json());
}

//  I think it's like the above, except it also has an error screen and a loading screen.
export function useAllTags() {
	const [loading, setLoading] = useState(true); // what shows while the thing is loading
	const [allTags, setAllTags] = useState([]); // what shows when the thing has loaded
	const [error, setError] = useState(null); // what shows when there's an error

	useEffect(() => {
		// try getting all contacts
		getAllTags()
			//if all contacts got, then set the state to the retrieved contacts
			.then((allTags) => {
				setAllTags(allTags);
				setLoading(false);
			})
			//set state to error state if caught an error
			.catch((e) => {
				console.log(e);
				setError(e);
				setLoading(false);
			});
	}, []);

	return {
		// return the states
		loading,
		allTags,
		error,
	};
}

// getting one tag by tag's id
function getOneTag(id) {
	const endpoint = BASE_URL + "/api/get-one-tag";
	return fetch(endpoint).then((res) => res.json());
}

//  I think it's like the above, except it also has an error screen and a loading screen.
export function useOneTag() {
	const [loading, setLoading] = useState(true); // what shows while the thing is loading
	const [tag, setTag] = useState([]); // what shows when the thing has loaded
	const [error, setError] = useState(null); // what shows when there's an error

	useEffect(() => {
		// try getting all contacts
		getOneTag()
			//if all contacts got, then set the state to the retrieved contacts
			.then((tag) => {
				setTag(tag);
				setLoading(false);
			})
			//set state to error state if caught an error
			.catch((e) => {
				console.log(e);
				setError(e);
				setLoading(false);
			});
	}, []);

	return {
		// return the states
		loading,
		tag,
		error,
	};
}

//getting tags by user id
function getUserTags(id) {
	const endpoint = BASE_URL + "/api/get-user-tag";
	return fetch(endpoint).then((res) => res.json());
}

//  I think it's like the above, except it also has an error screen and a loading screen.
export function useUserTag() {
	const [loading, setLoading] = useState(true); // what shows while the thing is loading
	const [userTags, setUserTags] = useState([]); // what shows when the thing has loaded
	const [error, setError] = useState(null); // what shows when there's an error

	useEffect(() => {
		// try getting all contacts
		getUserTags()
			//if all contacts got, then set the state to the retrieved contacts
			.then((userTags) => {
				setUserTags(userTags);
				setLoading(false);
			})
			//set state to error state if caught an error
			.catch((e) => {
				console.log(e);
				setError(e);
				setLoading(false);
			});
	}, []);

	return {
		// return the states
		loading,
		userTags,
		error,
	};
}

//creating a tag
export async function addTag(tag) {
	//get the url
	let endpoint = BASE_URL + "/api/add-tag";
	// ask to fetch, using the below settings
	try {
		const response = fetch(endpoint, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(tag),
		});

		//return response if any
		const json = await response.json();
		return json;
	} catch (error) {
		//catch any errors
		console.error(error);
	}
}

//edit tag
export async function updateTag(tagDetails) {
	//get the url
	let endpoint = BASE_URL + "/api/update-tag";
	// ask to fetch, using the below settings
	try {
		const response = fetch(endpoint, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(tagDetails),
		});

		//return response if any
		const json = await response.json();
		return json;
	} catch (error) {
		//catch any errors
		console.error(error);
	}
}

//delete tag
export async function deleteTag(id) {
	//get the url
	let endpoint = BASE_URL + "/api/delete-tag";
	// ask to fetch, using the below settings
	try {
		const response = fetch(endpoint, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(id),
		});

		//return response if any
		const json = await response.json();
		return json;
	} catch (error) {
		//catch any errors
		console.error(error);
	}
}
