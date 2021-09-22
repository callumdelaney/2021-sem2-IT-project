import React, { useState } from "react";

import ContactsTable from "./components/ContactsTable";
import Contact from "./components/Contact";

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
          <Contact />
        </div>
      </div>
    </>
  );
}

export default Contacts;
