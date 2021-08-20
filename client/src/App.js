import React from "react";
import Login from "./Login";

function App() {
  const [data, setData] = React.useState(null);
  // runs on the first render of the page
  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="container">
      {/* <header> */}
      {/* conditional rendering */}
      {/* <p>{!data ? "Loading..." : data}</p> */}
      {/* </header> */}
      <Login />
    </div>
  );
}

export default App;
