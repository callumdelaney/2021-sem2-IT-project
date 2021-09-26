import React from "react";
import { text, tableData } from "./data";
import ContactCreation from "./ContactCreation";
import { useGlobalState } from "state-pool";
import ContactUpdate from "./ContactUpdate";
import { useState } from "react";
import Contacts from "../Contacts";

// contact-info content
function Contact() {
  const [info, setInfo] = useGlobalState("contactInfo");

  // passing in props here fixed the issue
  const handleEditClick = () => {
    setInfo({
      addContact: false,
      editContact: true,
      firstName: info.firstName,
      category: info.category,
      notes: info.notes,
      phoneNumber: info.phoneNumber,
      email: info.email,
      photo: info.photo,
      id: info.id,
    });
  };

  const handleDeleteClick = () => {
    console.log("delete");
  };
  // display contact creation area if no contact is selected or user presses add contact button
  if (info.firstName === -1 || info.addContact) {
    return <ContactCreation />;
  }
  if (info.editContact) {
    return (
      <ContactUpdate
        firstName={info.firstName}
        category={info.category}
        notes={info.notes}
        phoneNumber={info.phoneNumber}
        email={info.email}
        photo={info.photo}
        id={info.id}
      />
    );
  }
  return (
    <div className="contact-info">
      {/* contact photo and name */}
      <div className="contact-info-name">
        <img src={info.photo} alt="contactPhoto" />
        <h1>{info.firstName}</h1>
      </div>
      <div
        style={{ display: "inline-flex", width: "100%", marginLeft: "100px" }}
      >
        {/* phone number */}
        <h2 style={{ border: "none", paddingRight: "50px" }}>Phone Number:</h2>
        <h2>{info.phoneNumber}</h2>
      </div>

      <div
        style={{ display: "inline-flex", width: "100%", marginLeft: "100px" }}
      >
        {/* email */}
        <h2 style={{ border: "none", paddingRight: "50px" }}>Email:</h2>
        <h2>{info.email}</h2>
      </div>
      <div
        style={{
          display: "inline-block",
          width: "90%",
          border: "2px solid black",
          marginLeft: "50px",
        }}
      >
        {/* descripton/notes */}
        <h2 style={{ border: "none", padding: "0px 10px" }}>Notes: </h2>
        <p
          style={{
            maxWidth: "100%",
            display: "inline",
            padding: "10px",
          }}
        >
          {info.notes}
        </p>
      </div>
      {/* Edit and delete Buttons */}
      <button
        style={{ display: "flex" }}
        onClick={() => {
          handleEditClick();
        }}
      >
        Edit
      </button>
      <button
        style={{ color: "red" }}
        onClick={() => {
          handleDeleteClick();
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default Contact;
