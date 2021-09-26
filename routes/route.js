const express = require("express");
const bodyParser = require('body-parser'); 
const session = require('express-session');
const passport = require('passport');
const connectEnsureLogin = require('connect-ensure-login');

const router = express.Router();

const controller = require("../controllers/controller");

router.use(bodyParser.urlencoded({
  extended: true
}))
router.use(bodyParser.json())
// .post method receives data 'posted' by client-side
router.post('/api/login', controller.login);
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

router.get("/api/get-tags", connectEnsureLogin.ensureLoggedIn(), controller.getTags);
router.get("/api/get-one-tag", connectEnsureLogin.ensureLoggedIn(), controller.getOneTag);
router.post("/api/get-user-tags",  connectEnsureLogin.ensureLoggedIn(), controller.getUserTags);
router.post("/api/add-tag", controller.addNewTag);
router.post("/api/update-tag", controller.editTag);
router.post("/api/delete-tag",  controller.deleteTag);



router.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

module.exports = router;
