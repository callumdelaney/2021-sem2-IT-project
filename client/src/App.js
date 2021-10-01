import React from "react";
import Pages from "./pages";

function App() {
	const [data, setData] = React.useState(null);
	// runs on the first render of the page
	React.useEffect(() => {
		fetch("/api")
			.then((res) => res.json())
			.then((data) => setData(data.message));
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
