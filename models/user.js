const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userId : {type : String, required : true, unique : true},
    email : {type : String, required : true, unique : true},
    password: {type : String, required : true}
})

const USER = mongoose.model('User', userSchema)

module.exports = USER
