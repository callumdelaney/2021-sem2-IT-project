const mongoose = require('mongoose')

const contact = mongoose.model("Contact")
const user = mongoose.model("User")

const bcrypt = require("bcrypt");

const getLogin = async (req, res) => {
  var userData = {
    email: req.body.email,
    pass: await bcrypt.hash(req.body.password, 10),
  };
  //Placeholder until user schema finished
  res.send(JSON.stringify(userData));
};

const getContacts = (req, res) => {};

const getOneContact = (req, res) => {};


module.exports = {
  getLogin,
  getContacts,
  getOneContact,
};
