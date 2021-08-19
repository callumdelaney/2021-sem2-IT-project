const path = require("path");
require("./models/db.js");
const express = require("express");

// by default the client-side runs on port 3000,
// so they can't run on the same port
const PORT = process.env.PORT || 3001;

const app = express();
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "./client/build")));



const router = require('./routes/route.js')
app.use('/', router)


// testing /api for client to communicate with server
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

module.exports = app;