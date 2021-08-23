const mongoose = require('mongoose') 

const Contact = mongoose.model("Contact")

const getLogin = (req, res) => {
    res.send("Hello");
}

const getContacts = (req, res) => {
   
}

const getOneContact = (req, res) => {
   
}

const addNewContact = (req, res) => {
    try {
        const newContact = await Contact.create({
            "contactId" : req.body.contact_id,
            "firstName" : req.body.first_name,
            "lastName" : req.body.last_name,
            "phone" : req.body.phone,
            "email" : req.body.email,
            "category" : req.body.category
        })
    
        new Contact(newContact).save()

        window.alert("Contact created")

        res.redirect("/contacts")
    
    } catch (err) {
        res.send("Failed")
        throw(err)
    }
  
}

module.exports = {
    getLogin,
    getContacts,
    getOneContact,
    addNewContact
}
