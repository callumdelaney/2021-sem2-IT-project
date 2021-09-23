import React from "react";
import { text } from "./data";
import ContactCreation from "./ContactCreation";

// contact-info content
function Contact(props) {
  const { firstName, category } = props;
  if (firstName === -1) {
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
