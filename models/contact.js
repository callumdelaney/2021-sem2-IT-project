const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    contactId : {type : String, required : false, unique: false},
    firstName : {type : String, required : true},
    lastName : {type : String, required : true},
    phone : {type : String, required : false},
    email : {type : String, required : false},
    notes : {type : String, required : false},
    category : {type : String, required : false}
})

const CONTACT = mongoose.model('Contact', contactSchema)

module.exports = CONTACT