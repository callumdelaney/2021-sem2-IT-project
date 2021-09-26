const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Contact = mongoose.model("Contact");
const User = mongoose.model("User");

const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

const passportFunc = require('../passport');


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
        console.log(contacts)
    } catch (err) {
        console.log(err)
        return res.send({ status: status.FAILURE })
    }
}

// Get one specific contact
const getOneContact = async (req, res) => {
    try {
        let contact = await Contact.findOne({
            "_id": req.body._id
        }).lean()
        res.send({
            status: status.SUCCESS,
            contacts: JSON.stringify(contact)
        });
    } catch (err) {
        console.log(err)
        return res.send({ status: status.FAILURE })
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
        res.send({ status: status.SUCCESS })
    } catch (err) {
        console.log(err)
        res.send({ status: status.FAILURE })
    }
    console.log(newContact)
}

const editContact = async (req, res) => {
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
        res.send({ status: status.SUCCESS })
    } catch (err) {
        console.log(err)
        res.send({ status: status.FAILURE })
    }
}

const deleteContact = async (req, res) => {
    try {
        await Contact.findOneAndDelete({
            "contactId": req.body.contactId
        })
        res.send({ status: status.SUCCESS })
    } catch (err) {
        res.send({ status: status.FAILURE })
    }
}

const addNote = async (req, res) => {
    let newNote = req.body.note
    try {
        var contact = await Contact.findOne({ "contactId": req.body.contactId })
        contact.notes.push(newNote)
        contact.save
        res.send({ status: status.SUCCESS })
    } catch (err) {
        res.send({ status: status.FAILURE })
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
        res.send({ status: status.SUCCESS })
    } catch (err) {
        res.send({ status: status.FAILURE })
    }
}


const newUser = async (req, res) => {
    var pass = passportFunc.genPassword(req.body.password)
    try {
        const newUser = await User.create({
            username: req.body.email,
            hash: pass.hash,
            salt: pass.salt
        })

        new User(newUser).save();
    } catch (err) {
        res.send({ status: status.FAILURE, error: err })
        console.log(err)
    }
}

/**
 * Authenticates login details and, if valid, logs the user in
 * (i.e. starts a session)
 * @param req expects an email and a password
 * @param res responds with a status code
 */
const login = async (req, res, next) => {

    /* This is a work-around:
    User schemas have 'email' but Passport needs req to have 'username' */
    var data = {
        username: req.body.email,
        password: req.body.password
    }
    req.body = data;

    passport.authenticate('local', (err, user, info) => {
        if (err) {
            res.send({ status: status.FAILURE, error: err })
            return next(err);
        }

        if (!user) {
            res.send({ status: status.INCORRECT_CREDENTIALS })
        }

        req.logIn(user, function (err) {
            res.send({ status: status.SUCCESS })
        })
    })(req, res, next);
}


module.exports = {
    login,
    getContacts,
    getOneContact,
    addNewContact,
    editContact,
    deleteContact,
    addNote,
    changeCategory,
    newUser
};
