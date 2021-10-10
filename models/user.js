const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {type : String, required : true, unique : true},
    salt : {type: String, required: true},
    hash : {type: String, required: true},
    firstName: {type : String, required : true},
    lastName: {type : String, required : true},
    photo: {type: String, required: false}
})

const USER = mongoose.model('User', userSchema)

module.exports = USER
