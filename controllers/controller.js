const mongoose = require("mongoose");

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
        res.send({status: status.FAILURE})
    }
}

// Get one specific contact
const getOneContact = async (req, res) => {
    try {
        const contact = await Contact.findOne({
            "contactId": req.body.contactId
        }).lean()

        res.send({
            status: status.SUCCESS,
            contacts: JSON.stringify(contact)
        });
    } catch (err) {
        console.log(err)
        res.send({status: status.FAILURE})
    }
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

        window.alert("Contact created")
        res.send({status: status.SUCCESS})

    } catch (err) {
        console.log(err)
        res.send({status: status.FAILURE})
    }
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

        window.alert("Contact updated")
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

        window.alert("Contact deleted")
        res.send({status: status.SUCCESS})
    } catch (err) {
        res.send({status: status.FAILURE})
    }
}

const addNote = async (req, res) => {
    try {
        var contact = await Contact.findOne({ "contactId": req.body.contactId })
        contact.notes.push(req.body.note)
        contact.save

        res.send({status: status.SUCCESS})
    } catch (err) {
        res.send({status: status.FAILURE})
    }
}

//Change contact category
const changeCategory = async (req, res) => {
    try {
        await Contact.findOneAndUpdate({
            "contactId": req.body.contactId
        }, {
            "category": req.body.category
        })

        window.alert("Category updated")

        res.send({status: status.SUCCESS})
    } catch (err) {
        res.send({status: status.FAILURE})
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

