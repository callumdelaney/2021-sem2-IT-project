import React, { useState } from "react";
import axios from "axios";

function ContactCreation() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  //   const handleSubmit = (e) => {
  //     e.preventDefault();

  //     // setError based on feedback from back-end
  //     var localStatus = statusCode.SUCCESS;
  //     setStatus(statusCode.SUCCESS);
  //     // if the two password fields don't match, can't move forward
  //     if (password !== passwordConfirm) {
  //       // dynamically change border color of these elements to red
  //       console.log("went here");
  //       document.getElementById("password").style["border-color"] = "red";
  //       document.getElementById("passwordConfirm").style["border-color"] = "red";
  //       // change status code accordingly
  //       localStatus = statusCode.MISMATCHED_PASSWORDS;
  //       setStatus(statusCode.MISMATCHED_PASSWORDS);
  //     }
  //     // registration details
  //     var userData = {
  //       firstName: firstName,
  //       lastName: lastName,
  //       phoneNumber: phoneNumber,
  //       email: email,
  //       password: password,
  //     };
  //     // use axios to post user data to back end for processing, use
  //     // response to test for validity
  //     axios
  //       .post("/api", userData)
  //       .then((response) => {
  //         console.log(response.data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //     // since status won't change until the end of this function, need local status
  //     // to keep track of the actual value
  //     if (localStatus === statusCode.SUCCESS) {
  //       togglePopup();
  //     }
  //   };

  return (
    // Contents of the page, each seperated by a div
    <article className="articleSignup">
      <h1 className="header">Sign Up</h1>
      <form className="form" action="" onSubmit={console.log("hi")}>
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
            value={lastName}
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
            type="number"
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
            onChange={(e) => {
              setPassword(e.target.value);
              // reset border color
              document.getElementById("password").style["border-color"] =
                "transparent";
            }}
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
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
              // reset border color
              document.getElementById("passwordConfirm").style["border-color"] =
                "transparent";
            }}
          />
        </div>
        <button type="submit">Register</button>
        {/* conditional rendering of error message based on status */}
        {/* <ErrorMessage statusCode={status} /> */}
      </form>
      )
    </article>
  );
}

export default ContactCreation;
