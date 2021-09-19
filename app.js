const path = require("path");
require("./models/db.js");
const express = require("express");

// by default the client-side runs on port 3000,
// so they can't run on the same port
const PORT = process.env.PORT || 3001;

const app = express();
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "./client/build")));

const router = require("./routes/route");

app.use("/", router);

// this code allows retrieval of json files from client-side
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
///////////////////////////////

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

module.exports = app;
