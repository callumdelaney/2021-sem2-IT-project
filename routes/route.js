const express = require("express");
const bodyParser = require('body-parser'); 
const session = require('express-session');
const passport = require('passport');
const connectEnsureLogin = require('connect-ensure-login');
const mongoose = require("mongoose");
const User = mongoose.model("User");

const router = express.Router();

router.use(bodyParser.urlencoded({
  extended: true
}))
router.use(bodyParser.json())

const controller = require("../controllers/controller");

router.use(session({
  secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 }
}));

router.use(passport.initialize());
router.use(passport.session());

// Passport Local Strategy
passport.use(User.createStrategy());

// To use with sessions
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// .post method receives data 'posted' by client-side
router.post("/api/login", controller.login);
router.post("/api/signup", controller.newUser);
//router.post("/api/update-user", controller.editUser);
//router.post("/api/update-user-password", controller.changePassword);
router.get("/api/get-contacts", connectEnsureLogin.ensureLoggedIn(), controller.getContacts);
router.get("/api/get-one-contact", connectEnsureLogin.ensureLoggedIn(), controller.getOneContact);
router.post("/api/add-contact", controller.addNewContact);
router.post("/api/update-contact", controller.editContact);
router.post("/api/delete-contact",  controller.deleteContact);
router.post("/api/add-note",  controller.addNote);
router.post("/api/change-category",  controller.changeCategory);

router.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

module.exports = router;
