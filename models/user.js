const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
    userId_1 : {type: String, required: false,  unique: false},
    username : {type : String, required : true, unique : true}
    //password : {type : String, required : true}
})

userSchema.plugin(passportLocalMongoose);
const USER = mongoose.model('User', userSchema)

module.exports = USER
