const path = require("path");
require("./models/db.js");
const express = require("express");
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const connectEnsureLogin = require('connect-ensure-login');
const passportLocalMongoose = require("passport-local-mongoose");
const mongoose = require("mongoose");
const User = mongoose.model("User");

// by default the client-side runs on port 3000,
// so they can't run on the same port
const PORT = process.env.PORT || 3001;

const app = express();
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "./client/build")));


app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())


app.use(session({
  secret: 'r8q,+&1LM3)CD*zAGp352sfD1xm{NeQhc;#',
  resave: false,
  saveUninitialized: true,
}));


app.use(passport.initialize());
app.use(passport.session());

// this code allows retrieval of json files from client-side
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const router = require("./routes/route");

app.use("/", router);

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

module.exports = app;
