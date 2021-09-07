import React, { useState } from "react";
import axios from "axios";

// component for sign up page
function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // handleSubmit is executed when the submit button is clicked
  const handleSubmit = (e) => {
    e.preventDefault();
    // registration details
    var userData = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      email: email,
      password: password,
    };
    // use axios to post user data to back end for processing, use
    // response to test for validity
    axios
      .post("/api", userData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    // Contents of the page, each seperated by a div
    <article className="articleSignup">
      <form className="form" action="" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="firstName">First name:* </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="lastName">Last name:* </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            value={firstName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="email">Email:* </label>
          <input
            type="text"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="Phone">Phone number: </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password:* </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="passwordConfirm">Confirm password:* </label>
          <input
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            required
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </article>
  );
}

export default Signup;
