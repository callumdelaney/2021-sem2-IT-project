import React from "react";
import Pages from "./pages";

function App() {
	return (
		<div className="container">
			{/* conditional rendering */}
			{/* <p>{!data ? "Loading..." : data}</p> */}
			<Pages />
		</div>
	);
}

export default App;
