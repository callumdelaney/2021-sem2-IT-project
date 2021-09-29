import { useState, useEffect } from "react";
import React from "react";

//const BASE_URL = "https://duckroll-crm.herokuapp.com/";
 const BASE_URL = 'http://localhost:3000'


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
router.post("/api/delete-contact",  controller.deleteContact);
router.post("/api/add-note",  controller.addNote);
router.post("/api/change-category",  controller.changeCategory);

router.get("/api/get-tags", connectEnsureLogin.ensureLoggedIn(), controller.getTags);
router.get("/api/get-one-tag", connectEnsureLogin.ensureLoggedIn(), controller.getOneTag);
router.post("/api/get-user-tags",  connectEnsureLogin.ensureLoggedIn(), controller.getUserTags);
router.post("/api/add-tag", controller.addNewTag);
router.post("/api/update-tag", controller.editTag);
router.post("/api/delete-tag",  controller.deleteTag);

*/

/// these are not yet protected
//some of these or the backend may need to be modified, if the data they return/inputting format is difficult for the frontend.
//getting all contacts

//you can put them into already existing functions called by the buttons, or directly stick them onto buttons, as you normally do


function getAllContacts() {
    const endpoint = BASE_URL + '/api/get-contacts';
    return fetch(endpoint).then(res => res.json());
}

//get one contact by id.
function getOneContact(id) {
    const endpoint = BASE_URL + `/api/get-one-contact`;
    return fetch(endpoint).then(res => res.json());
    //don't know if we're using axios/credential checking in this same manner
    //return axios.get(endpoint, {withCredentials:true}).then(res => res.data);
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
        .then(allContacts => {
          setAllContacts(allContacts);
          setLoading(false);
        })
        //set state to error state if caught an error
        .catch(e => {
          console.log(e);
          setError(e);
          setLoading(false);
        });
    }, []);
  
    return {
      loading,
      allContacts,
      error
    };
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
      .then(contact => {
          setContact(contact);
        setLoading(false);
      })
      //if there's an error in getting the contact, change state to error state
      .catch(e => {
        console.log(e);
        setError(e);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    contact,
    error
  };
}


// posting https://reactnative.dev/docs/network

//creating a contact
export async function addContact(contact) {
  //get the url
  let endpoint = BASE_URL + '/api/add-contact';
  // ask to fetch, using the below settings
  try { 
    const response = fetch(endpoint, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(contact)
    });

    //return response if any
    const json = await response.json();
    return json;
  } 
  //catch any errors
  catch (error) {
    console.error(error);
  }
};
  
    

//edit contact
export async function updateContact(contact) {
  //get the url
  let endpoint = BASE_URL + '/api/update-contact';
  // ask to fetch, using the below settings
  try { 
    const response = fetch(endpoint, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(contact)
    });

    //return response if any
    const json = await response.json();
    return json;
  } 
  //catch any errors
  catch (error) {
    console.error(error);
  }
};

//delete contact
export async function deleteContact(id) {
  //get the url
  let endpoint = BASE_URL + '/api/delete-contact';
  // ask to fetch, using the below settings
  try { 
    const response = fetch(endpoint, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(id)
    });

    //return response if any
    const json = await response.json();
    return json;
  } 
  //catch any errors
  catch (error) {
    console.error(error);
  }
};

//add note
export async function addContactNote(note) {
  //get the url
  let endpoint = BASE_URL + '/api/add-note';
  // ask to fetch, using the below settings
  try { 
    const response = fetch(endpoint, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(note)
    });

    //return response if any
    const json = await response.json();
    return json;
  } 
  //catch any errors
  catch (error) {
    console.error(error);
  }
};


//change catergoty
// details, i think would contain the contact id, and the catergory
export async function updateContactCatergory(contactDetails) {
  //get the url
  let endpoint = BASE_URL + '/api/change-category';
  // ask to fetch, using the below settings
  try { 
    const response = fetch(endpoint, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(contactDetails)
    });

    //return response if any
    const json = await response.json();
    return json;
  } 
  //catch any errors
  catch (error) {
    console.error(error);
  }
};
