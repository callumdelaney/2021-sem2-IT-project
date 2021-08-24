const mongoose = require('mongoose')

const contact = mongoose.model("Contact")
const user = mongoose.model("User")

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
