const express = require("express");

// by default the client-side runs on port 3000,
// so they can't run on the same port
const PORT = process.env.PORT || 3001;

const app = express();

require("./models/db.js");
// testing /api for client to fetch message from this path
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
