import React, { useState } from "react";

import ContactsTable from "./components/ContactsTable";
import Contact from "./components/Contact";
import UserInfo from "./components/UserInfo";
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
          <UserInfo />
          {/* component displaying contact-info */}
          <Contact />
        </div>
      </div>
    </>
  );
}

export default Contacts;
