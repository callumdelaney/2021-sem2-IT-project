import { useState, useEffect } from "react";
import React from "react";

//const BASE_URL = "https://snacks-in-a-van-2021.duckroll-crm.herokuapp.com";
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
router.post("/api/update-contact", controller.editContact);
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
        getAllContacts()
        .then(allContacts => {
          setAllContacts(allContacts);
          setLoading(false);
        })
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
    const [loading, setLoading] = useState(true);
    const [contact, setContact] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      getOneContact(id)
        .then(food => {
            setContact(contact);
          setLoading(false);
        })
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

export async function addContact(contact) {
    let endpoint = BASE_URL + '/api/add-contact';
    return fetch(endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(contact)
    })
    .then((response) => response.json())
    .then((json) => {
      return json.addedContact;
    })
    .catch((error) => {
      console.error(error);
    });
  
    
}
  


