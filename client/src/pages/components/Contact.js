import React from "react";
import { text, tableData } from "./data";
import ContactCreation from "./ContactCreation";
import { useGlobalState } from "state-pool";
import ContactUpdate from "./ContactUpdate";
import { useState } from "react";
import Contacts from "../Contacts";

// contact-info content
function Contact(props) {
  const {
    addContact,
    editContact,
    firstName,
    category,
    notes,
    phoneNumber,
    email,
    photo,
    id,
  } = props;
  const [info, setInfo] = useGlobalState("contactInfo");

  // passing in props here fixed the issue
  const handleEditClick = (props) => {
    setInfo({
      addContact: false,
      editContact: true,
      firstName: props.firstName,
      category: props.category,
      notes: props.notes,
      phoneNumber: props.phoneNumber,
      email: props.email,
      photo: props.photo,
      id: props.id,
    });
  };

  const handleDeleteClick = (id) => {
    console.log("delete");
    console.log(id);
  };
  // display contact creation area if no contact is selected or user presses add contact button
  if (firstName === -1 || addContact) {
    return <ContactCreation />;
  }
  if (editContact) {
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
        <img src={photo} alt="contactPhoto" />
        <h1>{firstName}</h1>
      </div>
      <div
        style={{ display: "inline-flex", width: "100%", marginLeft: "100px" }}
      >
        {/* phone number */}
        <h2 style={{ border: "none", paddingRight: "50px" }}>Phone Number:</h2>
        <h2>{phoneNumber}</h2>
      </div>

      <div
        style={{ display: "inline-flex", width: "100%", marginLeft: "100px" }}
      >
        {/* email */}
        <h2 style={{ border: "none", paddingRight: "50px" }}>Email:</h2>
        <h2>{email}</h2>
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
          {notes}
        </p>
      </div>
      {/* Edit and delete Buttons */}
      <button
        style={{ display: "flex" }}
        onClick={() => {
          handleEditClick(props);
        }}
      >
        Edit
      </button>
      <button
        style={{ color: "red" }}
        onClick={() => {
          handleDeleteClick(id);
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default Contact;
