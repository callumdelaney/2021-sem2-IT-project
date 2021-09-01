const mongoose = require("mongoose");

const contact = mongoose.model("Contact");
const user = mongoose.model("User");

//Get all contacts from database
const getContacts = (req, res) => {
   try {
       const contacts = await Contact.find({}).lean()

       res.send(JSON.stringify(contacts));
   } catch (err) {
       return res.send(err)
   }
}

//Get one specific contact
const getOneContact = (req, res) => {
   try {
       const contact = await Contact.findOne({
           "contactId" : req.body.contactId
       }).lean()

       res.send(JSON.stringify(contact));
   } catch (err) {
       return res.send(err)
   }
}

//New contact
const addNewContact = (req, res) => {
    try {
        const newContact = await Contact.create({
            "contactId" : req.body.contactId,
            "firstName" : req.body.first_name,
            "lastName" : req.body.last_name,
            "phone" : req.body.phone,
            "email" : req.body.email,
            "category" : req.body.category
        })
    
        new Contact(newContact).save()

        window.alert("Contact created")

        res.send({message : "Contact created"})
    
    } catch (err) {
        res.send("Failed")
        throw(err)
    }
  
}

//Edit contact
const editContact = (res, req) => {
    try {
        await Contact.findOneAndUpdate({
            "contactId" : req.body.contactId
        }, {
            "firstName" : req.body.firstName,
            "lastName" : req.body.lastName,
            "phone" : req.body.phone,
            "email" : req.body.email,
            "category" : req.body.category
        })

        window.alert("Contact updated")

        res.send({message : "Contact updated"})

    } catch (err) {
        return res.send(err)
    }
}

//Delete contact
const deleteContact = (res, req) => {
    try {
        await Contact.findOneAndDelete({
            "contactId" : req.body.contactId
        })

        window.alert("Contact deleted")

        res.send({message : "Contact deleted"})
    } catch (err) {
        return res.send(err)
    }
}

//Add note to contact
const addNote = (req, res) => {
    var newNote = req.body.note
    try {
        var contact = await Contact.findOne({"contactId" : req.body.contactId})

        contact.notes.push(req.body.note)

        contact.save
    } catch (err) {
        return res.send(err)
    }
}

//Change contact category
const changeCategory = (req, res) => {
    try {
        await Contact.findOneAndUpdate({
            "contactId" : req.body.contactId
        }, {
            "category" : req.body.category
        })

        window.alert("Category updated")

        res.send({message : "Category updated"})
    } catch (err) {
        return res.send(err)
    }
}

const bcrypt = require("bcrypt");

const getLogin = async (req, res) => {
  var userData = {
    email: req.body.email,
    pass: await bcrypt.hash(req.body.password, 10),
  };
  //Placeholder until user schema finished
  res.send(JSON.stringify(userData));
  console.log(req.body);
};

module.exports = {
  getLogin,
  getContacts,
  getOneContact,
  addNewContact,
  editContact,
  deleteContact,
  addNote,
  changeCategory
};

