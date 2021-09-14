const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Contact = mongoose.model("Contact");
const User = mongoose.model("User");

// ENUM for status codes (refer to API documentation)
const status = {
    FAILURE: 0,
    SUCCESS: 1,
    UNKNOWN_EMAIL: 11,
    INCORRECT_CREDENTIALS: 12,
    EMAIL_TAKEN: 13,
    INVALID_PASSWORD: 14
}


/******************* outgoing (backend -> frontend) ***************************/


// Get all contacts from database
const getContacts = async (req, res) => {
    try {
        let contacts = await Contact.find({}).lean()
        res.send({
            status: status.SUCCESS,
            contacts: JSON.stringify(contacts)
        });
    } catch (err) {
        console.log(err)
        return res.send({status: status.FAILURE})
    }
    console.log(contacts)
}

// Get one specific contact
const getOneContact = async (req, res) => {
    try {
        let contact = await Contact.findOne({
            "_id" : req.body._id
        }).lean()
        res.send({
            status: status.SUCCESS,
            contacts: JSON.stringify(contact)
        });
    } catch (err) {
        console.log(err)
        return res.send({status: status.FAILURE})
    }
    console.log(contact)
}


/******************* incoming (frontend -> backend) ***************************/

const addNewContact = async (req, res) => {
    try {
        const newContact = await Contact.create({
            "contactId": req.body.contactId,
            "firstName": req.body.first_name,
            "lastName": req.body.last_name,
            "phone": req.body.phone,
            "email": req.body.email,
            "category": req.body.category
        })
        new Contact(newContact).save()
        res.send({status: status.SUCCESS})
    } catch (err) {
        console.log(err)
        res.send({status: status.FAILURE})
    }
    console.log(newContact)
}


const editContact = async (res, req) => {
    try {
        await Contact.findOneAndUpdate({
            "contactId": req.body.contactId
        }, {
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "phone": req.body.phone,
            "email": req.body.email,
            "category": req.body.category
        })
        res.send({status: status.SUCCESS})
    } catch (err) {
        console.log(err)
        res.send({status: status.FAILURE})
    }
}


const deleteContact = async (res, req) => {
    try {
        await Contact.findOneAndDelete({
            "contactId": req.body.contactId
        })
        res.send({status: status.SUCCESS})
    } catch (err) {
        res.send({status: status.FAILURE})
    }
}


const addNote = async (req, res) => {
    let newNote = req.body.note
    try {
        var contact = await Contact.findOne({"contactId": req.body.contactId})
        contact.notes.push(newNote)
        contact.save
        res.send({status: status.SUCCESS})
    } catch (err) {
        res.send({status: status.FAILURE})
    }
    console.log(newNote)
}


const changeCategory = async (req, res) => {
    try {
        await Contact.findOneAndUpdate({
            "contactId": req.body.contactId
        }, {
            "category": req.body.category
        })
        res.send({status: status.SUCCESS})
    } catch (err) {
        res.send({status: status.FAILURE})
    }
}

//Logs user in
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
}


const newUser = async (req, res) => {
    var userData = {
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.LastName,
        phoneNumber: req.body.phoneNumber
    }

    const salt = await bcrypt.genSalt(10);

    const newUser = new User(userData);

    newUser.password = await bcrypt.hash(newUser.password, salt);
    newUser.save()

    res.send({status: status.SUCCESS})
}

module.exports = {
    getLogin,
    getContacts,
    getOneContact,
    addNewContact,
    editContact,
    deleteContact,
    addNote,
    changeCategory,
    newUser

};
