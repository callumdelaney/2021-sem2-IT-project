const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email : {type : String, required : true, unique : true},
    password: {type : String, required : true},
    firstName: {type : String, required : true},
    lastName: {type : String, required : true},
    phoneNumber: {type : String, required : true}
})

const USER = mongoose.model('User', userSchema)

module.exports = USER
