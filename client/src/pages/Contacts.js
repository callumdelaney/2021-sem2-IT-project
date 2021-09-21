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
            <h1>Hello There</h1>
            <img
              src="https://erasmuscoursescroatia.com/wp-content/uploads/2015/11/no-user-200x200.jpg"
              alt="userphoto"
            />
          </div>
          {/* component displaying contact-info */}
          <Contact />
        </div>
      </div>
    </>
  );
}

export default Contacts;
