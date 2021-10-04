const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema({
    //userID required since tags are linked to the users that create them
    userId : {type: [String], required : true},
   // userId : {type: [mongoose.Schema.Types.ObjectId], required : true, ref: 'User'},
    tagText : {type : String, required : true},
    //tag colour stored as string for Hex value
    tagColour : {type : String, required : true}
})

const TAG = mongoose.model('Tag', tagSchema)

module.exports = TAG
