import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ErrorMessage from "./components/ErrorMessage";
import statusCode from "./components/Status";

// component for login page
function Login() {
  // hooks, setXXXX will change the associated variable and then re-render the page
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(statusCode.SUCCESS);

  // handleSubmit is executed when the submit button is clicked
  const handleSubmit = (e) => {
    e.preventDefault();

    // setError based on feedback from back-end. localStatus can change within
    // this function to be referenced
    var localStatus = statusCode.UNKNOWN_EMAIL;
    setStatus(statusCode.UNKNOWN_EMAIL);

    // registration details
    var userData = {
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
    // Section for login details where email and password can be entered
    <article className="articleLogin">
      <h1 className="header">Login</h1>
      <form className="form" action="" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="email">Email: </label>
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
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <Link to="/signup">
          <button>Signup</button>
        </Link>
        {/* conditional rendering of error message based on status */}
        <ErrorMessage statusCode={status} />
      </form>
    </article>
  );
}

export default Login;
