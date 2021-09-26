const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Contact = mongoose.model("Contact");
const User = mongoose.model("User");
const Tag = mongoose.model("Tag");

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
        return res.send({status: status.FAILURE})
    }
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
        res.send({status: status.SUCCESS})
    } catch (err) {
        console.log(err)
        res.send({status: status.FAILURE})
    }
}

const deleteContact = async (req, res) => {
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
        res.send({status: status.FAILURE, error: err})
        console.log(err)
    }
}

const login = async (req, res, next) => {
    var data = {
        username: req.body.email,
        password: req.body.password
    }

    req.body = data;

    passport.authenticate('local', (err, user, info) => {
        if (err) {
            res.send({status: status.FAILURE, error: err})
            return next(err);
        }

        if (!user) {
            res.send({status: status.INCORRECT_CREDENTIALS})
        }

        req.logIn(user, function (err) {
            res.send({status: status.SUCCESS})
        })
    })(req, res, next);
}



// tag stuff



/******************* outgoing (backend -> frontend) ***************************/




//Get all tags from database
const getTags = async (req, res) => {
    try {
        console.log("getting tags");
        let tags = await Tag.find({}).lean()
        
        res.send({       
            tags: JSON.stringify(tags),
            message : "tag got",
            status: status.SUCCESS
        });

        console.log(tags)
        

    } catch (err) {
        console.log("tags get fail");
        console.log(err)
        return res.send({status: status.FAILURE})
        
    }
 }
 

//get tags by userID

const getUserTags = async (req, res) => {
    try {
        let tags = await Tag.find({
            //searching for all tags linked to one userId
            'userId': req.body.userId

        }).lean()

        //if tag us found, send success and log tag
        res.send({
            status: status.SUCCESS,
            tags: JSON.stringify(tags)
        });

        console.log(tags)

    } catch (err) {
        console.log(err)
        return res.send({status: status.FAILURE})
    }
 }

 //Get one specific tag
 const getOneTag = async (req, res) => {
    try {
        //try to find it
        let tag = await Tag.findOne({
            "_id" : req.body._id
            
        }).lean()
 
        //send it if found, and report success
        res.send({
            status: status.SUCCESS,
            tags: JSON.stringify(tag)
        });
        console.log(tag)

    }  catch (err) {
        console.log(err)
        return res.send({status: status.FAILURE})
    }
 }
 
 /******************* incoming (frontend -> backend) ***************************/


 //New tag
 const addNewTag = async (req, res) => {
     try {
 

        //Generate random hex colour from
        // https://css-tricks.com/snippets/javascript/random-hex-color/
        var randomColour = Math.floor(Math.random()*16777215).toString(16);
     
        const newTag = await Tag.create({
            "userId" : req.body.userId,
            "tagText" : req.body.tagText,
            //"tagColour" : req.body.tagColour
            //random generate tag's hex colour instead
            "tagColour": randomColour
       })
         
        
     
        new Tag(newTag).save()
        console.log(newTag)
        res.send({status: status.SUCCESS})
     
    } catch (err) {
        console.log(err)
        res.send({status: status.FAILURE})
    }

   
 }
 
 //Edit tag
 const editTag = async (req, res) => {
    

     try {

         

         
        await Tag.findOneAndUpdate({
            "_id" : req.body._id,
        }, {
            "tagText" : req.body.tagText,
            "tagColour" : req.body.tagColour
        })
        
        
 
        res.send({status: status.SUCCESS})
 
    } catch (err) {
        console.log(err)
        res.send({status: status.FAILURE})
    }
 }
 
 //Delete tag
 const deleteTag = async (req, res) => {
    try {

       

        await Tag.findOneAndDelete({
            "_id" : req.body._id
        })

        res.send({status: status.SUCCESS})

      //  window.alert("tag deleted")
      //  res.send({message : "tag deleted"})
    } catch (err) {
        res.send({status: status.FAILURE})
    }
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
    newUser,
    getTags,
    getUserTags,
    getOneTag,
    addNewTag,
    editTag,
    deleteTag
};

