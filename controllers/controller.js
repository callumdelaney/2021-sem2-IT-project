const mongoose = require("mongoose");

const Contact = mongoose.model("Contact");
const User = mongoose.model("User");

//Get all contacts from database
const getContacts = async (req, res) => {
   try {
       const contacts = await Contact.find({}).lean()

       res.send(JSON.stringify(contacts));
       console.log(contacts)
   } catch (err) {
       return res.send(err)
   }
}

//Get one specific contact
const getOneContact = async (req, res) => {
   try {
       const contact = await Contact.findOne({
           "_id" : req.body._id
       }).lean()

       res.send(JSON.stringify(contact));
       console.log(contact)
   } catch (err) {
       return res.send(err)
   }
}

//New contact
const addNewContact = async (req, res) => {
    try {
        const newContact = await Contact.create({
            "contactId" : req.body.contactId,
            "firstName" : req.body.first_name,
            "lastName" : req.body.last_name,
            "phone" : req.body.phone,
            "email" : req.body.email,
            "category" : req.body.category
        })

        console.log(newContact)
        
        new Contact(newContact).save()
   
    
    } catch (err) {
        res.send("Failed")
        throw(err)
    }
  
}

//Edit contact
const editContact = async (res, req) => {
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

        await Contact.findOneAndUpdate({
            "contactId" : req.body.contactId
        }, {
            "firstName" : "Frank"
        })


    } catch (err) {
        return res.send(err)
    }
}

//Delete contact
const deleteContact = async (res, req) => {
    try {
        await Contact.findOneAndDelete({
            "contactId" : res.body.contactId
        })

    } catch (err) {
        return res.send(err)
    }
}

//Add note to contact
const addNote = async (req, res) => {
    var newNote = req.body.notes
    try {
        await Contact.findOneAndUpdate({
            "contactId" : req.body.contactId
        }, {
            "notes" : newNote
        })
        
        console.log(newNote)
    } catch (err) {
        return res.send(err)
    }
}

//Change contact category
const changeCategory = async (req, res) => {
    try {
        await Contact.findOneAndUpdate({
            "contactId" : req.body.contactId
        }, {
            "category" : req.body.category
        })

    } catch (err) {
        return res.send(err)
    }
}

const bcrypt = require("bcrypt");

const getLogin = async (req, res) => {
  var userData = {
    email: req.body.email,
    pass: req.body.password
  };
 
  var user = await User.findOne({"email" : userData.email}).lean()

  if (user != null) {
      if (user.password == userData.pass) {

          console.log("Success")
      } else {
          console.log("Fail")
      }
  } else {
      console.log("User not found")
  }
  //Placeholder until user schema finished
  res.send(JSON.stringify(userData));

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

