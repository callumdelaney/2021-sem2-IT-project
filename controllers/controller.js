const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Contact = mongoose.model("Contact");
const User = mongoose.model("User");
const Tag = mongoose.model("Tag");

//

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
            contacts: JSON.stringify(contacts),
            status: status.SUCCESS
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
        console.log(contact)
    } catch (err) {
        console.log(err)
        return res.send({status: status.FAILURE})
    }
    
}

/******************* incoming (frontend -> backend) ***************************/


//New contact

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
        console.log(newContact)
        new Contact(newContact).save()
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
        console.log(newNote)
        res.send({status: status.SUCCESS})
    } catch (err) {
        res.send({status: status.FAILURE})
    }
    
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





//login stuff 

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

     
        const newTag = await Tag.create({
            "userId" : req.body.userId,
            "tagText" : req.body.tagText,
            "tagColour" : req.body.tagColour
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
 const editTag = async (res, req) => {
    

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
 const deleteTag = async (res, req) => {
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

