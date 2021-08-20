import React, { useState } from "react";
import axios from "axios";

// component for login page
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // handleSubmit is executed when the submit button is clicked
  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    // needs to be fixed
    axios
      .post("http://localhost:3001/api", formData, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    // Section for login details where email and password can be entered
    <article className="article">
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
      </form>
    </article>
  );
}

export default Login;
