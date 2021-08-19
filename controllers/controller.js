const mongoose = require('mongoose') 

const Contact = mongoose.model("Contact")

const getLogin = (req, res) => {
    res.send("Hello");
}

const getContacts = (req, res) => {
   
}

const getOneContact = (req, res) => {
   
}

module.exports = {
    getLogin,
    getContacts,
    getOneContact
}
