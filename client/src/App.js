import React from "react";
import Pages from "./pages";

function App() {
	const [data, setData] = React.useState(null);

	// runs on the first render of the page
	React.useEffect(() => {
		fetch("/api")
			.then((data) => setData("delete me"));
		console.log(data);
	}, [data]);

	return (
		<div className="container">
			{/* conditional rendering */}
			{/* <p>{!data ? "Loading..." : data}</p> */}
			<Pages />
		</div>
	);
}

export default App;
