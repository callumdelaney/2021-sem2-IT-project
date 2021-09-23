import React from "react";
import { text } from "./data";
import ContactCreation from "./ContactCreation";

// contact-info content
function Contact(props) {
  const { addContact, firstName, category } = props;
  // display contact creation area if no contact is selected or user presses add contact button
  if (firstName === -1 || addContact) {
    return <ContactCreation />;
  }
  return (
    <div className="contact-info">
      <h1>{firstName}</h1>
      <p>{text}</p>
    </div>
  );
}

export default Contact;
