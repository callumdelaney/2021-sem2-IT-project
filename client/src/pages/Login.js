import React, { useState } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import ErrorMessage from "./components/ErrorMessage";
import statusCode from "./components/Status";
import { store, useGlobalState } from "state-pool";

// store.setState("contactInfo", { firstName: -1 });
// initialise user info global variable
store.setState("userInfo", {
	firstName: "Obi-Wan",
	lastName: "Kenobi",
	email: "obiwankenobi@hellothere.org",
	photo: "https://static.myfigurecollection.net/pics/figure/big/44190.jpg",
});

// component for login page
function Login() {
	// hooks, setXXXX will change the associated variable and then re-render the page
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// default success so that error won't appear
	const [status, setStatus] = useState(statusCode.SUCCESS);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	// const [contactInfo, setContactInfo] = useGlobalState("contactInfo");
	const [userInfo, setUserInfo] = useGlobalState("userInfo");

	// handleSubmit is executed when the submit button is clicked
	const handleSubmit = (e) => {
		e.preventDefault();

		// setStatus and localStatus keep track of what errors can be returned from trying to log in
		var localStatus = status;

		// registration details
		var userData = {
			email: email,
			password: password,
		};
		console.log(userData);
		// use axios to post user data to back end for processing, use
		// response to test for validity
		axios
			.post("/api/login", userData)
			.then((response) => {
				console.log(response.data);
				// check if credentials are correct
				localStatus = response.data.status;
				setStatus(localStatus);

				if (localStatus === statusCode.SUCCESS) {
					console.log("login successful!");
					fetch("/api/user-info", userData)
						.then((res) => res.json())
						.then((data) => {
							setUserInfo(data);
							console.log(data);
						})
						.catch((error) => {
							console.log(error);
						});
					// fetch("/api/user-contacts", userData)
					//   .then((res) => res.json())
					//   .then((data) => setContactInfo(data));
					console.log(userInfo);
					setIsLoggedIn(true);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	if (isLoggedIn) {
		// redirect to contacts page upon successful login
		return <Redirect to="/contacts" />;
	}
	return (
		// Section for login details where email and password can be entered
		<article className="articleLogin">
			<h1 className="header">Login</h1>
			{/* form div containing all of the required fields */}
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
