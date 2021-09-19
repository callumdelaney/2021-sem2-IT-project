const express = require("express");
const cors = require("cors");
var corsOptions = {origin: 'https://duckroll-crm.herokuapp.com/contacts'}

const router = express.Router();

const controller = require("../controllers/controller");

router.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// .post method receives data 'posted' by client-side
router.post("/api/login", controller.login);
//router.post("/api/signup", controller.newUser);
router.get("/api/getContacts", cors(corsOptions), controller.getContacts);
router.get("/api/getOneContact", cors(corsOptions), controller.getOneContact);
router.post("/api/addContact", cors(corsOptions), controller.addNewContact);
router.post("/api/editContact", cors(corsOptions), controller.editContact);
router.post("/api/deleteContact", cors(corsOptions), controller.deleteContact);
router.post("/api/addNote", cors(corsOptions), controller.addNote);
router.post("/api/changeCategory", cors(corsOptions), controller.changeCategory);


/////////////////////////////////////////////// added by Callum

// All other GET requests not handled before will return our React app
router.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});


module.exports = router;
