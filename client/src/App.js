import React from "react";

function App() {
  const [data, setData] = React.useState(null);
  // runs on the first render of the page
  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div>
      <header>
        {/* conditional rendering */}
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default App;
