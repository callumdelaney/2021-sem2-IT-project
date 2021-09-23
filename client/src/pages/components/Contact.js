import React from "react";
import { text } from "./data";
import ContactCreation from "./ContactCreation";

// contact-info content
function Contact(props) {
  const { addContact, firstName, category, notes, phoneNumber, email, photo } =
    props;
  // display contact creation area if no contact is selected or user presses add contact button
  if (firstName === -1 || addContact) {
    return <ContactCreation />;
  }
  return (
    <div className="contact-info">
      <div className="contact-info-name">
        <img src={photo} alt="photo" />
        <h1>{firstName}</h1>
      </div>
      {/* <div>
        <h2>{category}</h2>
      </div> */}
      <div className="contact-info-details">
        <h2>{phoneNumber}</h2>
      </div>
      <div className="contact-info-details">
        <h2>{email}</h2>
      </div>
      <div>
        <p>{notes}</p>
      </div>
    </div>
  );
}

export default Contact;
