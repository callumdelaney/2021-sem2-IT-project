import React from "react";
import { text } from "./data";
import ContactCreation from "./ContactCreation";

// contact-info content
function Contact({
  firstName,
  lastName,
  email,
  phoneNumber,
  category,
  notes,
  photo,
}) {
  if (firstName === undefined) {
    return <ContactCreation />;
  }
  return (
    <div className="contact-info">
      <h1>contact</h1>
      <p>{text}</p>
    </div>
  );
}

export default Contact;
