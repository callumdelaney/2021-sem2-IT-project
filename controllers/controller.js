const mongoose = require('mongoose') 

const Contact = mongoose.model("Contact")

const Login = (req, res) => {
  
    var userData = {
        email : req.body.email,
        pass : req.body.password
    }
    //Placeholder until user schema finished
    res.send(JSON.stringify(userData));
}

const getContacts = (req, res) => {
   
}

const getOneContact = (req, res) => {
   
}

module.exports = {
    Login,
    getContacts,
    getOneContact
}
