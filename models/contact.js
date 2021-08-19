const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    contactId : {type : String, required : true, unique : true},
    first_name : {type : String, required : true},
    last_name : {type : String, required : true},
    phone : {type : String, required : false},
    email : {type : String, required : false},
    notes : [{type : String, required : false}],
    category : {type : String, required : false}
})

const CONTACT = mongoose.model('Contact', contactSchema)

module.exports = CONTACT