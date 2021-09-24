import React, { useState } from "react";

import ContactsTable from "./components/ContactsTable";
import Contact from "./components/Contact";
import { store, useGlobalState } from "state-pool";

// declare a global state variable, contactInfo, with an initial "unselected" state
store.setState("contactInfo", { firstName: -1 });

/*Contacts page main function*/
function Contacts() {
  const [info, setInfo] = useGlobalState("contactInfo");

  return (
    <>
      <div className="flex-container">
        <div className="flex-child">
          {/* Left-hand table showing records of user contacts */}
          <ContactsTable />
        </div>
        <div className="flex-child">
          {/* div displaying user information */}
          <div className="user-info">
            <img
              src="https://erasmuscoursescroatia.com/wp-content/uploads/2015/11/no-user-200x200.jpg"
              alt="userphoto"
            />
            <h1>Hello There</h1>
            <div>
              <button>Profile Setting</button>
            </div>
            <h4>user email here</h4>
          </div>
          {/* component displaying contact-info */}
          <Contact
            addContact={info.addContact}
            editContact={info.editContact}
            firstName={info.firstName}
            category={info.category}
            notes={info.notes}
            phoneNumber={info.phoneNumber}
            email={info.email}
            photo={info.photo}
          />
        </div>
      </div>
    </>
  );
}

export default Contacts;
