import React from "react";
import { text, tableData } from "./data";
import ContactCreation from "./ContactCreation";
import { useGlobalState } from "state-pool";
import ContactUpdate from "./ContactUpdate";
import { useState } from "react";

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
  } = props;
  const [info, setInfo] = useGlobalState("contactInfo");
  const [newTableData, setNewTableData] = useState(tableData);

  const handleEditClick = (firstName, category, notes, phoneNumber, email) => {
    setInfo({
      addContact: false,
      editContact: true,
      firstName: firstName,
      category: category,
      notes: notes,
      phoneNumber: phoneNumber,
      email: email,
    });
  };

  const handleDeleteClick = (id) => {
    console.log(id);
  };
  // display contact creation area if no contact is selected or user presses add contact button
  if (firstName === -1 || addContact) {
    return <ContactCreation />;
  }
  if (editContact) {
    return (
      <ContactUpdate
        firstName={firstName}
        category={info.category}
        notes={info.notes}
        phoneNumber={info.phoneNumber}
        email={info.email}
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
        onClick={(firstName, category, notes, phoneNumber, email) => {
          handleEditClick(firstName, category, notes, phoneNumber, email);
        }}
      >
        Edit
      </button>
      <button
        style={{ color: "red" }}
        onClick={() => {
          handleDeleteClick(tableData);
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default Contact;
