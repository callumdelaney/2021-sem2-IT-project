import React from "react";
import { useState, useEffect } from "react";
import ContactsTable from "./components/ContactsTable";
import Contact from "./components/Contact";
import UserInfo from "./components/UserInfo";
import { store } from "state-pool";
//import { userTags } from "./components/data";

// declare a global state variable, contactInfo, with an initial "unselected" state
store.setState("contactInfo", { firstName: -1, tags: [] });
// declare global userTags variable to keep track of user tags

store.setState("userTags", []);


/*Contacts page main function*/
function Contacts() {

    useEffect(() => {
        fetch("/api/get-tags")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                store.setState("userTags", data.tags);
                
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    
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
