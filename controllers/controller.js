const mongoose = require("mongoose");

<<<<<<< HEAD
const contact = mongoose.model("Contact");
const user = mongoose.model("User");
const tag = mongoose.model("Tag")

//
=======
const Contact = mongoose.model("Contact");
const User = mongoose.model("User");
>>>>>>> c78dd643182e3f456b4f525ac6782010363fd477

//Get all contacts from database
const getContacts = async (req, res) => {
   try {
       const contacts = await Contact.find({}).lean()

       res.send(JSON.stringify(contacts));
   } catch (err) {
       return res.send(err)
   }
}

//Get one specific contact
const getOneContact = async (req, res) => {
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
    
        new Contact(newContact).save()

        window.alert("Contact created")

        res.send({message : "Contact created"})
    
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

        window.alert("Contact updated")

        res.send({message : "Contact updated"})

    } catch (err) {
        return res.send(err)
    }
}

//Delete contact
const deleteContact = async (res, req) => {
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
const addNote = async (req, res) => {
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
const changeCategory = async (req, res) => {
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

// tag stuff


//Get all tags from database
const getTags = async (req, res) => {
    try {
        const tags = await Tag.find({}).lean()
 
        res.send(JSON.stringify(tags));
    } catch (err) {
        return res.send(err)
    }
 }
 

//get tags by userID

const getUserTags = async (req, res) => {
    try {
        const tags = await Tag.find({
            //searching for all tags linked to one userId
            'userId': req.body.userId

        }).lean()
 
        res.send(JSON.stringify(tags));
    } catch (err) {
        return res.send(err)
    }
 }

 //Get one specific tag
 const getOneTag = async (req, res) => {
    try {
        const tag = await Tag.findOne({
            "_id" : req.body._id
        }).lean()
 
        res.send(JSON.stringify(tag));
    } catch (err) {
        return res.send(err)
    }
 }
 
 //New tag
 const addNewTag = async (req, res) => {
     try {
         const newTag = await Tag.create({
             "userId" : req.body.userId,
             "tagText" : req.body.tagText,
             "tagColour" : req.body.tagColour
         })
     
         new Tag(newTag).save()
 
         window.alert("Tag created")
 
         res.send({message : "Tag created"})
     
     } catch (err) {
         res.send("Failed")
         throw(err)
     }
   
 }
 
 //Edit tag
 const editTag = async (res, req) => {
     try {
         await Tag.findOneAndUpdate({
             "_id" : req.body._id
         }, {
             "tagText" : req.body.tagText,
             "tagColour" : req.body.tagColour
         })
 
         window.alert("Tag updated")
 
         res.send({message : "Tag updated"})
 
     } catch (err) {
         return res.send(err)
     }
 }
 
 //Delete tag
 const deleteTag = async (res, req) => {
     try {
         await Tag.findOneAndDelete({
             "_id" : req.body._id
         })
 
         window.alert("tag deleted")
 
         res.send({message : "tag deleted"})
     } catch (err) {
         return res.send(err)
     }
 }
 



// login stuff
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
  changeCategory,
  getTags,
  getUserTags,
  getOneTag,
  addNewTag,
  editTag,
  deleteTag
};

