const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema({
    //userID required since tags are linked to the users that create them
    userId : {type : String, required : true, unique : true},
    tagText : {type : String, required : true},
    //tag colour stored as string for Hex value
    tagColour : {type : String, required : true}
})

const TAG = mongoose.model('Tag', tagSchema)

module.exports = TAG
