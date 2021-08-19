const mongoose = require('mongoose')

const contactSchema = new.mongoose.Schema ({
    contactId : {type : String, required : true, unique : true},
    first_name : {type : String, required : true},
    last_name : {type : String, required : true},
    phone : {type : String},
    email : {type : String},
    notes : [{type : String}],
    category : {type : String}
})

const CONTACT = mongoose.model('Contact', contactSchema)

module.exports = CONTACT